const fs = require('fs');
const path = require('path');

const logos = {
  'python.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'tensorflow.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
  'keras.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
  'scikitlearn.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  'opencv.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
  'numpy.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
  'pandas.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
  'streamlit.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg',
  'postgresql.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'azure.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
  'powerbi.svg': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Power_bi_logo_black.svg',
  'huggingface.svg': 'https://www.vectorlogo.zone/logos/huggingface/huggingface-icon.svg', 
  'chromadb.svg': 'https://raw.githubusercontent.com/chroma-core/chroma/main/docs/docs/static/img/chroma.svg',
  'mediapipe.png': 'https://google.github.io/mediapipe/images/logo.png',
  'nltk.png': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/NLTK_Logo.png',
  'xgboost.png': 'https://upload.wikimedia.org/wikipedia/commons/6/69/XGBoost_logo.png'
};

const dir = path.join(process.cwd(), 'public', 'images', 'tech');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  for (const [name, url] of Object.entries(logos)) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(path.join(dir, name), Buffer.from(buffer));
      console.log(`Downloaded ${name}`);
    } catch (e) {
      console.error(`Failed ${name}:`, e.message);
    }
  }
}
download();
