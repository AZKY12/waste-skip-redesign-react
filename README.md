# EcoSkip Lanka - Sri Lankan Skip Hire Platform

A comprehensive, modern web application for skip hire services across Sri Lanka, built with React, TypeScript, and Tailwind CSS. Features multi-language support, user authentication, and a complete booking system.

---

## 🌟 Key Features

### 🎯 **Core Functionality**
- **Complete Booking System**: Multi-step skip hire booking process
- **User Authentication**: Secure login/register with JWT tokens
- **Multi-language Support**: English, Sinhala (සිංහල), and Tamil (தமிழ்)
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Theme**: System preference detection with manual toggle
- **Real-time Validation**: Form validation and error handling

### 🚀 **Advanced Features**
- **Interactive Skip Selection**: Carousel-based skip browsing with autoplay
- **Smart Date Picker**: Permit-aware delivery date selection
- **Permit Management**: Automatic permit requirement detection
- **Payment Integration**: Secure payment processing interface
- **Dashboard**: User account management and booking history
- **Contact System**: Multi-channel customer support

### 🎨 **User Experience**
- **Smooth Animations**: Micro-interactions and hover effects
- **Touch Optimization**: Mobile-first design with gesture support
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Progressive Disclosure**: Step-by-step booking process
- **Visual Feedback**: Loading states, success/error messages

---

## 🔧 Technologies Used

### **Frontend Stack**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** for consistent component library
- **React Router** for client-side routing
- **React Query** for server state management

### **UI Components & Libraries**
- **Embla Carousel** with autoplay functionality
- **Lucide React** for consistent iconography
- **React Hook Form** for form management
- **Radix UI** for accessible primitives
- **Date-fns** for date manipulation

### **Backend Integration**
- **Express.js** server with MongoDB
- **JWT Authentication** with bcrypt password hashing
- **Axios** for API communication
- **CORS** enabled for cross-origin requests

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB (local or cloud instance)

### **Installation**

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd sri-lankan-skip-hire
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Start development servers**:
   ```bash
   # Frontend (port 8080)
   npm run dev
   
   # Backend (port 3001) - in separate terminal
   npm run server
   ```

4. **Access the application**:
   - Frontend: http://localhost:8080
   - API: http://localhost:3001/api

---

## 📱 Application Structure

### **Multi-Step Booking Process**
1. **Location Entry**: Postcode and address validation
2. **Waste Type Selection**: Multiple waste category selection
3. **Skip Size Selection**: Interactive carousel with size comparison
4. **Permit Check**: Automatic permit requirement detection
5. **Date Selection**: Smart calendar with permit-aware scheduling
6. **Payment**: Secure payment processing with order summary

### **User Management**
- **Registration**: Multi-language form with district selection
- **Authentication**: Secure JWT-based login system
- **Dashboard**: Booking history and account management
- **Profile**: User preferences and settings

### **Content Pages**
- **Services**: Comprehensive service offerings
- **About**: Company information and values
- **Contact**: Multi-channel contact options with form

---

## 🌍 Internationalization

### **Supported Languages**
- **English** (en) - Default
- **Sinhala** (si) - සිංහල
- **Tamil** (ta) - தமிழ்

### **Localized Content**
- All UI text and labels
- District names in local languages
- Currency formatting (Sri Lankan Rupees)
- Date formatting (DD/MM/YYYY)
- Error messages and notifications

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Green gradient (eco-friendly theme)
- **Secondary**: Blue accents for trust and reliability
- **Success**: Emerald for positive actions
- **Warning**: Orange for permits and alerts
- **Error**: Red for validation and errors

### **Typography**
- **Headings**: Bold, hierarchical sizing
- **Body**: Readable line spacing (150%)
- **UI Text**: Medium weight for clarity
- **Code**: Monospace for technical content

### **Responsive Breakpoints**
- **Mobile**: < 640px (touch-optimized)
- **Tablet**: 640px - 1024px (hybrid interface)
- **Desktop**: 1024px+ (full feature set)

---

## 🔐 Security Features

### **Authentication**
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **Protected Routes**: Authentication-required pages
- **Session Persistence**: Automatic login restoration

### **Data Validation**
- **Client-side**: Real-time form validation
- **Server-side**: API endpoint validation
- **Input Sanitization**: XSS prevention
- **CORS Configuration**: Secure cross-origin requests

---

## 📊 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### **Bookings**
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get specific booking

### **Contact**
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint

---

## 🎯 Key Improvements Made

### **Enhanced User Experience**
- **Mobile-First Design**: Touch-optimized interface
- **Progressive Enhancement**: Feature-rich desktop experience
- **Smooth Animations**: 60fps transitions and micro-interactions
- **Loading States**: Visual feedback for all async operations

### **Accessibility Improvements**
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Visible focus indicators

### **Performance Optimizations**
- **Code Splitting**: Lazy-loaded components
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Optimization**: Tree-shaking and minification
- **Caching Strategy**: Efficient asset caching

### **Developer Experience**
- **TypeScript**: Full type safety throughout
- **ESLint Configuration**: Code quality enforcement
- **Component Architecture**: Modular, reusable components
- **Error Boundaries**: Graceful error handling

---

## 🌱 Environmental Focus

### **Sustainability Features**
- **Eco-friendly Branding**: Green color scheme and messaging
- **Waste Type Education**: Information about proper disposal
- **Recycling Emphasis**: 95% recycling rate highlighting
- **Local Service**: Supporting Sri Lankan communities

---

## 🚀 Deployment

### **Build Process**
```bash
# Production build
npm run build

# Preview build
npm run preview
```

### **Environment Variables**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecoskip-lanka

# Authentication
JWT_SECRET=your-secure-jwt-secret

# API Configuration
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

---

## 📈 Future Enhancements

### **Planned Features**
- **Payment Gateway Integration**: Stripe/PayPal integration
- **Real-time Tracking**: GPS tracking for skip delivery
- **SMS Notifications**: Delivery and collection alerts
- **Admin Dashboard**: Backend management interface
- **Mobile App**: React Native companion app

### **Technical Improvements**
- **PWA Support**: Offline functionality
- **Push Notifications**: Booking reminders
- **Advanced Analytics**: User behavior tracking
- **Performance Monitoring**: Real-time performance metrics

---

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured rules
- **Prettier**: Consistent code formatting
- **Component Structure**: Single responsibility principle

---

## 📞 Support

### **Contact Information**
- **Email**: info@ecoskiplanka.lk
- **Phone**: +94 11 234 5678
- **Website**: https://ecoskiplanka.lk

### **Technical Support**
- **Issues**: GitHub Issues for bug reports
- **Documentation**: Comprehensive inline documentation
- **Community**: Sri Lankan developer community support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Sri Lankan Environmental Authority** for sustainability guidelines
- **Local Communities** for feedback and testing
- **Open Source Community** for excellent libraries and tools
- **Design Inspiration** from leading waste management companies

---

**Built with ❤️ for a cleaner, greener Sri Lanka** 🇱🇰