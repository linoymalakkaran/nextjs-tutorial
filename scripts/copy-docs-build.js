const fs = require('fs-extra');
const path = require('path');

const SOURCE = path.join(__dirname, '../docs/build');
const DEST = path.join(__dirname, '../public/docs');

async function copyDocs() {
  try {
    console.log('📚 Copying Docusaurus build to public/docs...');
    
    // Remove existing docs folder
    if (fs.existsSync(DEST)) {
      await fs.remove(DEST);
      console.log('✅ Removed old docs');
    }
    
    // Copy new build
    await fs.copy(SOURCE, DEST);
    console.log('✅ Docusaurus documentation copied to public/docs');
    console.log('🎉 You can now access docs at http://localhost:3000/docs');
  } catch (error) {
    console.error('❌ Error copying docs:', error);
    process.exit(1);
  }
}

copyDocs();
