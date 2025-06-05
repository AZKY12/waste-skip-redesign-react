
# Skip Hire Selection Interface

A modern, responsive web application for selecting skip hire services built with React, TypeScript, and Tailwind CSS.

## Project Overview

This project implements an intuitive skip selection interface that allows users to browse and select different skip sizes for waste disposal services. The application features a carousel-based layout with detailed skip cards, filtering options, and a smooth user experience across all devices.

## Technical Approach

### Architecture & Technologies

- **React 18** with TypeScript for type-safe component development
- **Tailwind CSS** for utility-first styling and responsive design
- **Shadcn/UI** components for consistent, accessible UI elements
- **Embla Carousel** with autoplay for smooth skip browsing
- **Lucide React** for scalable vector icons
- **Vite** for fast development and optimized builds

### Key Design Decisions

#### 1. Component Structure
- **Modular Components**: Separated `SkipCard` and `SkipSelection` components for maintainability
- **Type Safety**: Comprehensive TypeScript interfaces for skip data structure
- **Reusable UI**: Leveraged Shadcn/UI components for consistency

#### 2. Image Handling Strategy
- **Size-Based Mapping**: Created a mapping function that associates skip sizes with specific images
- **Responsive Images**: Images scale appropriately across different screen sizes
- **Full Coverage**: Images now fill the entire container div using `object-cover` for consistent appearance
- **Fallback System**: Default image handling for unmapped skip sizes

#### 3. User Experience Enhancements

##### Mobile-First Responsive Design
- **Touch-Friendly**: Large touch targets and appropriate spacing for mobile devices
- **Adaptive Layout**: Different layouts for mobile (single column) vs desktop (multi-column grid)
- **Gesture Support**: Swipe gestures on mobile for carousel navigation

##### Visual Design Elements
- **3D Effects**: Subtle perspective transforms on selected cards
- **Gradient Backgrounds**: Modern gradient overlays and backgrounds
- **Hover States**: Interactive feedback with scale transforms and shadow changes
- **Popular Badge**: Eye-catching badge for highlighted options

##### Accessibility Features
- **High Contrast**: Strong color contrasts for readability
- **Focus States**: Clear focus indicators for keyboard navigation
- **Screen Reader Support**: Proper alt texts and semantic HTML
- **Touch Accessibility**: Appropriate touch target sizes (minimum 44px)

#### 4. State Management
- **Local State**: Using React's built-in useState for simple state management
- **Selection Logic**: Clear selected state management with visual feedback
- **Data Flow**: Props-based data flow for component communication

#### 5. Performance Optimizations
- **Image Optimization**: Proper image sizing and lazy loading considerations
- **Smooth Animations**: CSS transforms for hardware-accelerated animations
- **Efficient Rendering**: Minimal re-renders through proper state structure

### File Structure

```
src/
├── components/
│   ├── SkipCard.tsx          # Individual skip display component
│   ├── SkipSelection.tsx     # Main selection interface
│   ├── StepIndicator.tsx     # Progress indicator
│   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   └── ui/                   # Shadcn/UI components
│       ├── carousel.tsx
│       └── ...
├── contexts/
│   └── ThemeContext.tsx      # Theme management
└── ...
```

### Data Structure

The skip data follows a structured interface:

```typescript
interface SkipData {
  id: number;
  size: number;                 // Skip size in yards
  hire_period_days: number;     // Rental duration
  price_before_vat: number;     // Base price
  vat: number;                  // VAT percentage
  allowed_on_road: boolean;     // Road placement permission
  allows_heavy_waste: boolean;  // Heavy waste capability
  // ... additional fields
}
```

### Styling Approach

#### Design System
- **Color Palette**: Blue and purple gradients for primary actions, gray scale for neutral elements
- **Typography**: Responsive text sizing with clear hierarchy
- **Spacing**: Consistent spacing scale using Tailwind's spacing utilities
- **Shadows**: Layered shadow system for depth perception

#### Responsive Breakpoints
- **Mobile**: < 640px (single column, touch-optimized)
- **Tablet**: 640px - 1024px (two columns)
- **Desktop**: > 1024px (three+ columns, hover effects)

### Key Features

1. **Skip Selection Carousel**: Horizontal scrolling interface with autoplay
2. **Interactive Cards**: Detailed skip information with selection states
3. **Real-time Filtering**: Filter controls for skip characteristics
4. **Price Calculation**: Automatic VAT calculation and display
5. **Selection Feedback**: Clear visual indicators for selected items
6. **Progress Tracking**: Step indicator for multi-step process

### Image Implementation Details

#### Full Div Coverage Approach
- **Object-fit Cover**: Ensures images fill the entire container while maintaining aspect ratio
- **Positioning**: Absolute positioning within relative containers for precise control
- **Overlay System**: Gradient overlays for better text readability over images
- **Z-index Management**: Proper layering of images, overlays, and badges

#### Technical Implementation
```css
.skip-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
```

### Future Enhancements

1. **Advanced Filtering**: More sophisticated filter options
2. **Comparison Mode**: Side-by-side skip comparison
3. **Availability Calendar**: Real-time availability checking
4. **Cost Calculator**: Advanced pricing with location-based factors
5. **User Preferences**: Saved preferences and recommendations

### Development Workflow

1. **Component Development**: Build individual components with TypeScript
2. **Styling**: Apply Tailwind classes with responsive considerations
3. **Testing**: Manual testing across different devices and browsers
4. **Optimization**: Performance monitoring and improvement

This approach prioritizes user experience, maintainability, and scalability while delivering a polished, professional interface for skip hire selection.
