# 🎬 Gifly - Modern GIF Discovery Platform

## 🌟 Features

### 🎯 **Core Features**
- 🔍 **Search Millions of GIFs** - Powered by Giphy API
- 📁 **Organized Categories** - Browse trending, funny, cute, and more
- ❤️ **Favorites System** - Save your favorite GIFs
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🚀 **Fast Performance** - Optimized loading and smooth animations

### ✨ **Advanced Features**
- 🔗 **Smart Sharing** - Share GIFs with custom website links
- 📤 **Cross-Platform Sharing** - WhatsApp, Twitter, Facebook, LinkedIn, etc.
- 💾 **One-Click Download** - Save GIFs directly to device
- 📊 **Related Content** - Discover similar GIFs
- 🌙 **Modern UI** - Clean, dark-themed interface


## 🚀 Live Demo

**[👉 Click here to visit Live Website](https://sidd-gifly.vercel.app)**

## 📱 Responsive Design

### **Mobile (320px - 767px)**
- ✅ **Hamburger menu** for navigation
- ✅ **Touch-friendly** buttons and controls
- ✅ **Optimized columns** (2 columns for GIFs)
- ✅ **Mobile-first** approach
- ✅ **Gesture support** for better UX

### **Tablet (768px - 1023px)**
- ✅ **3-column** GIF layout
- ✅ **Larger tap targets**
- ✅ **Adaptive sidebar** (hidden/shown based on space)
- ✅ **Optimized font sizes**

### **Desktop (1024px+)**
- ✅ **4-column** GIF layouts
- ✅ **Full sidebar** with user info
- ✅ **Hover effects** and animations
- ✅ **Advanced sharing** options

## 🛠️ Technology Stack

### **Frontend**
- ⚛️ **React 18** - Modern UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🚦 **React Router v6** - Client-side routing
- 🔧 **Vite** - Fast build tool
- 🎯 **React Icons** - Beautiful icon set

### **API Integration**
- 🎬 **Giphy API** - GIF data and search
- 🔑 **API Key Management** - Secure environment variables

### **Deployment**
- ☁️ **Vercel** - Serverless deployment
- 🔄 **GitHub Actions** - CI/CD pipeline
- 📦 **Environment Variables** - Secure configuration

## 📦 Installation & Setup

### **Prerequisites**
- Node.js 16+ 
- npm or yarn
- Giphy API key

### **Local Development**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/gifly.git
cd gifly
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
cp .env.example .env
```
Add your Giphy API key to `.env`:
```env
VITE_GIPHY_API_KEY=your_api_key_here
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

5. **Build for Production**
```bash
npm run build
# or
yarn build
```

## 🎯 API Configuration

### **Get Your Giphy API Key**
1. Visit [Giphy Developers](https://developers.giphy.com/)
2. Create an account
3. Create a new app
4. Copy your API key

### **Rate Limits**
- Free tier: 42 requests/hour
- Production tier: 3,000 requests/hour

## 📁 Project Structure

```
gifly/
├── public/
│   ├── index.html
│   └── 404.html
├── src/
│   ├── components/
│   │   ├── Gif.jsx          # GIF display component
│   │   ├── Header.jsx       # Navigation header
│   │   └── FollowOn.jsx     # Social follow component
│   ├── pages/
│   │   ├── Home.jsx         # Homepage
│   │   ├── Findgif.jsx      # GIF detail page
│   │   ├── Category.jsx     # Category page
│   │   ├── Search.jsx       # Search results
│   │   └── Favorite.jsx     # Favorites page
│   ├── context/
│   │   └── GifContext.jsx   # Global state management
│   ├── layout/
│   │   └── AppLayout.jsx    # Main layout wrapper
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── .env.example             # Environment template
├── vercel.json             # Vercel configuration
├── vite.config.js          # Build configuration
└── package.json            # Dependencies
```

## 🎨 Customization

### **Change Colors**
Edit `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### **Modify Layout**
- **Columns**: Edit grid classes in components
- **Spacing**: Adjust padding/margin in Tailwind classes
- **Animations**: Add custom CSS transitions

### **Add New Pages**
1. Create new component in `pages/`
2. Add route in `App.jsx`
3. Update navigation in `Header.jsx`

## 🔒 Security Features

- ✅ **Environment variables** for API keys
- ✅ **CORS protection** on API calls
- ✅ **Input sanitization** for search queries
- ✅ **Rate limiting** awareness
- ✅ **Secure sharing** with website URLs

## 📊 Performance Optimizations

- ⚡ **Code splitting** with React.lazy()
- 🖼️ **Lazy loading** images
- 🗜️ **Minified** production builds
- 🔄 **Memoized** components
- 🚀 **Fast refresh** in development

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow React best practices
- Use functional components with hooks
- Maintain responsive design
- Add PropTypes for components
- Write clean, commented code

## 🐛 Troubleshooting

### **Common Issues**

| Issue | Solution |
|-------|----------|
| API not working | Check API key in .env file |
| Routing issues | Ensure vercel.json is configured |
| Build errors | Clear node_modules and reinstall |
| Slow loading | Check network and API rate limits |

### **Deployment Issues**
1. **404 on refresh**: Add proper `vercel.json` configuration
2. **API errors**: Verify environment variables in Vercel dashboard
3. **Build failures**: Check build logs in Vercel

## 📈 SEO Optimization

- ✅ **Dynamic meta tags** for each GIF
- ✅ **Open Graph** tags for social sharing
- ✅ **Twitter cards** integration
- ✅ **Semantic HTML** structure
- ✅ **Mobile-friendly** design

## 📱 Mobile Features

### **Touch Optimization**
- Large, tappable buttons
- Swipe gestures support
- Touch feedback animations
- Mobile-optimized modals

### **Performance**
- Optimized for 3G/4G connections
- Compressed images
- Minimal JavaScript bundle
- Progressive loading

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Giphy](https://giphy.com/) for the amazing API
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Vercel](https://vercel.com/) for hosting

## 📞 Support

Need help? 
- 📧 **Email**: siddharthgupta.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/sidd-gupta05/gifly/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/sidd-gupta05/gifly/discussions)

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ by Siddharth**
