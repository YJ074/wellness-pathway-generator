import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AboutUs = () => {
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
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
      }} className="mb-10 text-center">
          <img src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" alt="Arogyam75 Logo" className="h-28 w-auto mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            About Arogyam75
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revitalizing Indian wellness traditions for modern health challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
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
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Story</h2>
                <p className="mb-4">
                  Arogyam75 was born from a simple observation: while modern medicine has made remarkable advances, many Indians are losing touch with the rich wellness traditions that kept generations healthy for thousands of years.
                </p>
                <p className="mb-4">Our founder, Dr. Pragati Apte, noticed a concerning trend in her medical practice—patients were increasingly suffering from lifestyle diseases that could be prevented through proper nutrition and exercise, yet they struggled to find guidance that honored both scientific evidence and cultural context.</p>
                
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
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
                <p className="mb-4">
                  At Arogyam75, we're on a mission to democratize access to personalized wellness guidance that respects India's diverse culinary traditions while incorporating scientific advances in nutrition and fitness.
                </p>
                <p className="mb-4">
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
      }} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Cultural Integration</h3>
                <p>
                  We honor India's diverse food traditions and wellness practices, incorporating them meaningfully into our recommendations rather than replacing them with generic advice.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-700">Scientific Rigor</h3>
                <p>
                  Our recommendations are grounded in nutritional science and exercise physiology, ensuring that traditional practices are complemented by evidence-based approaches.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-green-700">Personalization</h3>
                <p>
                  We recognize that each person's body, preferences, and circumstances are unique, requiring individualized guidance rather than one-size-fits-all solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        
      </div>
    </div>;
};
export default AboutUs;