#!/bin/bash

echo "🚀 Starting Next.js Learning Hub..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Start Next.js app
echo "📱 Starting Next.js Application..."
if check_port 3000; then
    echo "⚠️  Port 3000 is already in use"
else
    npm run dev > /dev/null 2>&1 &
    NEXTJS_PID=$!
    echo "✅ Next.js started at http://localhost:3000 (PID: $NEXTJS_PID)"
fi

# Wait a moment
sleep 2

# Start Docusaurus
echo ""
echo "📚 Starting Documentation Site..."
cd docs
if check_port 3001; then
    echo "⚠️  Port 3001 is already in use"
else
    npm start > /dev/null 2>&1 &
    DOCS_PID=$!
    echo "✅ Documentation started at http://localhost:3001 (PID: $DOCS_PID)"
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Both applications are running!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Next.js App:      http://localhost:3000"
echo "📚 Documentation:    http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $NEXTJS_PID $DOCS_PID 2>/dev/null; exit" INT
wait
