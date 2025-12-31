# Running the Applications

## 🚀 Next.js Application

The main learning application with all features.

```bash
# From project root
npm run dev
```

Visit: **http://localhost:3000**

### Features Available:
- 19 interactive feature demonstrations
- Working code examples
- Real-time editing and hot reload

---

## 📚 Documentation Site (Docusaurus)

Beautiful documentation for all features.

```bash
# From project root
cd docs
npm start
```

Visit: **http://localhost:3001** (or 3000 if not occupied)

### Documentation Includes:
- Comprehensive guides for each feature
- Code examples with syntax highlighting
- Best practices and use cases
- Organized by category (Rendering, Data Management, State Management, etc.)

---

## 🎯 Recommended Workflow

1. **Start the Next.js app** to see live examples
2. **Start the Docs site** to read detailed explanations
3. **Split your screen**: Code on one side, docs on the other
4. **Experiment**: Modify code in the Next.js app while referencing the docs

---

## 📦 First Time Setup

```bash
# Install dependencies for main app
npm install

# Install dependencies for docs
cd docs
npm install
cd ..
```

---

## 🔄 Both Running at Once

```bash
# Terminal 1 - Next.js App
npm run dev

# Terminal 2 - Documentation
cd docs && npm start
```

Now you have:
- **Next.js App**: http://localhost:3000
- **Documentation**: http://localhost:3001

Happy learning! 🎓
