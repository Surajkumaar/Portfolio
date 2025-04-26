// This is a placeholder that forwards to our alternative 3D implementation
// We're using AnimatedCyberGlobe instead of ThreeScene to avoid dependencies on Three.js
import AnimatedCyberGlobe from './AnimatedCyberGlobe';

const ThreeScene = () => {
  // Just render our alternative component
  return <AnimatedCyberGlobe />;
};

export default ThreeScene;
