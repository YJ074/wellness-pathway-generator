import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Copyright } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Helmet>
        <title>About Us | Arogyam75 - Traditional Wellness for Modern Life</title>
        <meta name="description" content="Learn about Arogyam75's mission to revitalize Indian wellness traditions for modern health challenges. Discover our story, values, and commitment to personalized health." />
        <meta name="keywords" content="Arogyam75, Indian wellness, traditional health, holistic wellness, Fit India Movement" />
        <meta property="og:title" content="About Arogyam75 - Our Story and Mission" />
        <meta property="og:description" content="Revitalizing Indian wellness traditions for modern health challenges. Learn about our journey, values and vision." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <Link to="/" className="inline-block mb-4 md:mb-6">
          <Button variant="ghost" className="gap-1 md:gap-2 text-sm md:text-base">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
            Back to Home
          </Button>
        </Link>

        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="mb-6 md:mb-10 text-center">
          <img src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" 
               alt="Arogyam75 Logo - Traditional Indian wellness" 
               className="h-20 md:h-28 w-auto mx-auto mb-3 md:mb-4"
               width="112"
               height="112" />
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            About Arogyam75
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Revitalizing Indian wellness traditions for modern health challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <Card>
              <CardContent className="pt-4 md:pt-6 text-sm md:text-base">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-700">Our Story</h2>
                <p className="mb-3 md:mb-4">
                  Arogyam75 was born from a simple observation: while modern medicine has made remarkable advances, many Indians are losing touch with the rich wellness traditions that kept generations healthy for thousands of years.
                </p>
                <p className="mb-3 md:mb-4">Our founder, Dr. Pragati Apte, noticed a concerning trend in her medical practice—patients were increasingly suffering from lifestyle diseases that could be prevented through proper nutrition and exercise, yet they struggled to find guidance that honored both scientific evidence and cultural context.</p>
                
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <Card>
              <CardContent className="pt-4 md:pt-6 text-sm md:text-base">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-700">Our Mission</h2>
                <p className="mb-3 md:mb-4">
                  At Arogyam75, we're on a mission to democratize access to personalized wellness guidance that respects India's diverse culinary traditions while incorporating scientific advances in nutrition and fitness.
                </p>
                <p className="mb-3 md:mb-4">
                  We believe that optimal health shouldn't require extreme measures or abandoning cultural identity. Instead, we help people rediscover the wisdom embedded in regional cuisines and traditional practices, adapted thoughtfully for modern lifestyles.
                </p>
                <p>
                  Through our 75-day program, we aim to empower individuals with knowledge and habits that lead to sustainable wellness, reduced risk of lifestyle diseases, and enhanced quality of life—creating a ripple effect that benefits families and communities across the nation.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-gray-900">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-blue-50">
              <CardContent className="pt-4 md:pt-6 text-sm md:text-base">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-blue-700">Cultural Integration</h3>
                <p>
                  We honor India's diverse food traditions and wellness practices, incorporating them meaningfully into our recommendations rather than replacing them with generic advice.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="pt-4 md:pt-6 text-sm md:text-base">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-purple-700">Scientific Rigor</h3>
                <p>
                  Our recommendations are grounded in nutritional science and exercise physiology, ensuring that traditional practices are complemented by evidence-based approaches.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 sm:col-span-2 md:col-span-1">
              <CardContent className="pt-4 md:pt-6 text-sm md:text-base">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-green-700">Personalization</h3>
                <p>
                  We recognize that each person's body, preferences, and circumstances are unique, requiring individualized guidance rather than one-size-fits-all solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        <footer className="mt-8 md:mt-16 pb-4 text-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <div className="flex items-center">
              <Copyright className="h-3 w-3 mr-1" />
              <span>{new Date().getFullYear()} Arogyam75. All rights reserved.</span>
            </div>
            <div>
              <a href="mailto:support@arogyam75.com" className="text-blue-600 hover:underline">
                support@arogyam75.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default AboutUs;
