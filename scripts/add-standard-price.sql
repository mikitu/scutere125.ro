-- Add standardPrice column to scooters table
ALTER TABLE scooters ADD COLUMN IF NOT EXISTS standard_price DECIMAL(10,2);

-- Update standard prices for all scooters
-- Yamaha XMAX 125 Tech Max - 6500 pret standard - 6300 pretul nostru
UPDATE scooters SET price = 6300, standard_price = 6500 WHERE name = 'Yamaha XMAX 125 Tech Max';

-- Yamaha D'elight 125 - 2940 pret standard - 2790 pretul nostru
UPDATE scooters SET price = 2790, standard_price = 2940 WHERE name LIKE 'Yamaha D%elight 125' OR name = 'Yamaha Delight 125';

-- Yamaha NMAX 125 Tech Max - 4060 pret standard - 3950 pretul nostru
UPDATE scooters SET price = 3950, standard_price = 4060 WHERE name = 'Yamaha NMAX 125 Tech Max';

-- Yamaha Rayzr - 2430 pret standard - 2350 pretul nostru
UPDATE scooters SET price = 2350, standard_price = 2430 WHERE name LIKE '%Rayzr%';

-- Honda SH Mode 125 - 3350 pret standard - 2990 pretul nostru
UPDATE scooters SET standard_price = 3350 WHERE name = 'Honda SH Mode 125';

-- Honda PCX 125 - 3990 pret standard - 3590 pretul nostru
UPDATE scooters SET standard_price = 3990 WHERE name = 'Honda PCX 125';

-- Yamaha Tricity 125 - 5030 pret standard - 4850 pretul nostru
UPDATE scooters SET price = 4850, standard_price = 5030 WHERE name LIKE '%Tricity%';

-- Yamaha NMAX 125 (base) - 3770 pret standard - 3650 pretul nostru
UPDATE scooters SET price = 3650, standard_price = 3770 WHERE name = 'Yamaha NMAX 125';

-- Yamaha XMAX 125 (base) - 5680 pret standard - 5590 pretul nostru
UPDATE scooters SET price = 5590, standard_price = 5680 WHERE name = 'Yamaha XMAX 125';

-- Honda Forza 125 - 6050 pret standard - 5850 pretul nostru
UPDATE scooters SET price = 5850, standard_price = 6050 WHERE name = 'Honda Forza 125';

-- Verificare
SELECT name, price as "Pretul Nostru", standard_price as "Pret Standard", 
       (standard_price - price) as "Reducere €",
       ROUND((standard_price - price) / standard_price * 100, 1) as "Reducere %"
FROM scooters 
WHERE standard_price IS NOT NULL
ORDER BY manufacturer, name;

