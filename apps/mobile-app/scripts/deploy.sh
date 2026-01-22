#!/bin/bash

# Scutere125 Mobile App Deployment Script
# Usage: ./scripts/deploy.sh [platform] [profile]
# Example: ./scripts/deploy.sh ios production

set -e

PLATFORM=${1:-all}
PROFILE=${2:-production}

echo "🚀 Deploying Scutere125 Mobile App"
echo "Platform: $PLATFORM"
echo "Profile: $PROFILE"
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if logged in to Expo
echo "📝 Checking Expo authentication..."
if ! eas whoami &> /dev/null; then
    echo "🔐 Please login to Expo:"
    eas login
fi

# Verify environment
echo "🔍 Verifying environment..."
if [ ! -f "app.json" ]; then
    echo "❌ app.json not found. Are you in the mobile-app directory?"
    exit 1
fi

# Build
echo ""
echo "🔨 Starting build for $PLATFORM with $PROFILE profile..."
eas build --platform $PLATFORM --profile $PROFILE --non-interactive

# Ask if user wants to submit
echo ""
read -p "📤 Do you want to submit to stores? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Submitting to stores..."
    eas submit --platform $PLATFORM --latest
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Check build status: eas build:list"
echo "2. Monitor in Expo dashboard: https://expo.dev"
if [[ $PLATFORM == "ios" ]] || [[ $PLATFORM == "all" ]]; then
    echo "3. iOS: Check TestFlight in App Store Connect"
fi
if [[ $PLATFORM == "android" ]] || [[ $PLATFORM == "all" ]]; then
    echo "4. Android: Check Internal Testing in Google Play Console"
fi

