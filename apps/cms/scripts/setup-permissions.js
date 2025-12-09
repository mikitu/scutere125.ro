const { Client } = require('pg');

async function setupPermissions() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'scutere125',
    user: 'mihaibucse',
    password: '',
  });

  try {
    await client.connect();
    console.log('✅ Conectat la PostgreSQL');

    // Găsește role-ul Public
    const roleResult = await client.query(
      "SELECT id FROM up_roles WHERE type = 'public'"
    );
    const publicRoleId = roleResult.rows[0].id;
    console.log(`✅ Role Public găsit cu ID: ${publicRoleId}`);

    // Permisiunile de creat
    const permissions = [
      'api::scooter.scooter.find',
      'api::scooter.scooter.findOne',
    ];

    for (const action of permissions) {
      // Verifică dacă permisiunea există deja
      const existingPerm = await client.query(
        'SELECT id FROM up_permissions WHERE action = $1',
        [action]
      );

      let permissionId;

      if (existingPerm.rows.length > 0) {
        permissionId = existingPerm.rows[0].id;
        console.log(`ℹ️  Permisiunea ${action} există deja (ID: ${permissionId})`);
      } else {
        // Creează permisiunea
        const insertResult = await client.query(
          `INSERT INTO up_permissions (action, created_at, updated_at, created_by_id, updated_by_id)
           VALUES ($1, NOW(), NOW(), 1, 1)
           RETURNING id`,
          [action]
        );
        permissionId = insertResult.rows[0].id;
        console.log(`✅ Permisiune creată: ${action} (ID: ${permissionId})`);
      }

      // Verifică dacă link-ul există deja
      const existingLink = await client.query(
        'SELECT * FROM up_permissions_role_links WHERE permission_id = $1 AND role_id = $2',
        [permissionId, publicRoleId]
      );

      if (existingLink.rows.length === 0) {
        // Creează link-ul între permisiune și role
        await client.query(
          `INSERT INTO up_permissions_role_links (permission_id, role_id, permission_order)
           VALUES ($1, $2, 1)`,
          [permissionId, publicRoleId]
        );
        console.log(`✅ Link creat între permisiune ${permissionId} și role ${publicRoleId}`);
      } else {
        console.log(`ℹ️  Link-ul există deja pentru permisiunea ${permissionId}`);
      }
    }

    console.log('\n🎉 Permisiuni configurate cu succes!');
    console.log('\n📝 Testează API-ul:');
    console.log('   curl http://localhost:1337/api/scooters?populate=*');
  } catch (error) {
    console.error('❌ Eroare:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupPermissions();

