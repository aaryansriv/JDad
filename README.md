# 🧠 Prompt to JSON

<div align="center">

![Prompt to JSON Logo](https://img.shields.io/badge/🧠-Prompt%20to%20JSON-blue?style=for-the-badge&logoColor=white)

**Transform natural language prompts into optimized JSON structures for enhanced LLM performance**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Groq](https://img.shields.io/badge/Groq-API-FF6B35?style=flat-square)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[✨ Live Demo] [https://aaryansriv.github.io/JDad/ ](#) • [📖 Documentation](#features) • [🚀 Quick Start](#getting-started) • [🤝 Contributing](#contributing)

</div>

---

## 🌟 Overview

**Prompt to JSON** is a powerful web application that intelligently transforms natural language prompts into structured JSON formats, optimizing them for better performance with Large Language Models (LLMs). Built with modern web technologies and powered by Groq's lightning-fast AI inference.

### 🎯 Why Use Prompt to JSON?

- **📈 Enhanced Performance**: Structured prompts yield more consistent and accurate LLM responses
- **⚡ Lightning Fast**: Powered by Groq's high-performance inference engine
- **🎨 Beautiful UI**: Modern, responsive interface with smooth animations
- **🔧 Developer Friendly**: Easy to integrate and extend
- **💡 Smart Analysis**: Automatically identifies key entities, tasks, and formatting requirements

---

## ✨ Features

### 🧠 **Intelligent Prompt Analysis**
- Automatically extracts tasks, styles, and output formats
- Identifies key entities and contextual information
- Preserves original intent while optimizing structure

### 🎨 **Beautiful User Experience**
- Modern, responsive design with glassmorphism effects
- Smooth animations and transitions with Framer Motion
- Dark theme with vibrant accent colors
- Interactive elements with hover effects
- <img width="2559" height="1242" alt="Screenshot 2025-09-02 160743" src="https://github.com/user-attachments/assets/0d5ac263-c483-44fc-9e12-19166c31bf77" />


- <img width="2559" height="1251" alt="Screenshot 2025-09-02 160806" src="https://github.com/user-attachments/assets/a5aa9b55-5487-4dd2-8334-ba29bb8d45db" />


### 🔧 **Developer Features**
- **JSON Export**: Download optimized prompts as JSON files
- **Copy to Clipboard**: Quick copy functionality for easy integration
- **Edit Mode**: Modify and re-optimize prompts on the fly
- **Error Handling**: Comprehensive error management and user feedback

### ⚡ **Performance Optimized**
- Built with Vite for lightning-fast development and builds
- Efficient React components with proper state management
- Optimized bundle size and loading times

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Groq API Key** (free at [groq.com](https://groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/prompt-to-json.git
   cd prompt-to-json
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Groq API key to `.env`:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** to `http://localhost:5173`

### 🔑 Getting a Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

---

## 🏗️ Project Structure

```
prompt-to-json/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── PromptInput.tsx  # Input form component
│   │   ├── JsonOutput.tsx   # Results display
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   └── groq.ts         # Groq API integration
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── .env.example           # Environment variables template
└── README.md             # Project documentation
```

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | AI/Backend | Styling | Build Tools |
|----------|------------|---------|-------------|
| ⚛️ React 18 | 🚀 Groq API | 🎨 Tailwind CSS | ⚡ Vite |
| 📘 TypeScript | 🧠 Llama Models | ✨ Framer Motion | 📦 ESBuild |
| 🎭 Lucide Icons | | 🌈 Gradient Effects | |

</div>

---

## 📱 Usage Examples

### Basic Prompt Optimization

**Input:**
```
Write a product description for a new smartphone
```

**Output:**
```json
{
  "task": "Generate product description",
  "style": "Marketing copy",
  "output_format": "Structured product description",
  "entities": ["smartphone", "product", "features"],
  "original_prompt": "Write a product description for a new smartphone"
}
```

### Advanced Use Cases

- **📧 Email Marketing**: Transform casual email ideas into structured campaigns
- **📝 Content Creation**: Convert blog post concepts into detailed outlines
- **💻 Code Documentation**: Structure technical documentation requests
- **🎯 Marketing Copy**: Optimize ad copy and promotional content

---

## 🤝 Contributing

We love contributions! Here's how you can help make Prompt to JSON even better:

### 🐛 Found a Bug?
1. Check existing [issues](https://github.com/yourusername/prompt-to-json/issues)
2. Create a new issue with detailed reproduction steps
3. Include screenshots if relevant

### 💡 Have a Feature Idea?
1. Open a [feature request](https://github.com/yourusername/prompt-to-json/issues/new)
2. Describe the feature and its benefits
3. Discuss implementation approaches

### 🔧 Want to Contribute Code?
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Groq](https://groq.com/)** for providing lightning-fast AI inference
- **[Tailwind CSS](https://tailwindcss.com/)** for the amazing styling framework
- **[Framer Motion](https://www.framer.com/motion/)** for smooth animations
- **[Lucide](https://lucide.dev/)** for beautiful icons

---

<div align="center">

### 🌟 Star this repo if you find it useful!

**Built with ❤️ by [Your Name](https://github.com/yourusername)**

[⬆ Back to Top](#-prompt-to-json)

</div>
