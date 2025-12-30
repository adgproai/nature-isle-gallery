import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Shield, Home, Info, Briefcase, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroEditor } from '@/components/admin/HeroEditor';
import { AboutEditor } from '@/components/admin/AboutEditor';
import { ServicesEditor } from '@/components/admin/ServicesEditor';
import { ContactEditor } from '@/components/admin/ContactEditor';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-mist to-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-mist to-background">
        <Navigation />
        <div className="pt-32 pb-24 container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="font-serif text-2xl font-bold mb-2 text-foreground">
                Access Denied
              </h1>
              <p className="text-muted-foreground">
                You don't have admin privileges to access this page.
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-background">
      <Navigation />
      <div className="pt-32 pb-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-serif text-3xl flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>
                Manage your website content. Changes will be reflected on the live site.
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="hero" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Hero</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <HeroEditor />
            </TabsContent>

            <TabsContent value="about">
              <AboutEditor />
            </TabsContent>

            <TabsContent value="services">
              <ServicesEditor />
            </TabsContent>

            <TabsContent value="contact">
              <ContactEditor />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
