import { useEffect, useState } from 'react';
import { useSiteContent, ContactContent } from '@/hooks/useSiteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';

export const ContactEditor = () => {
  const { content, isLoading, saveContent, isSaving } = useSiteContent<ContactContent>('contact');
  const [formData, setFormData] = useState<ContactContent>({
    phone: '',
    email: '',
    location: '',
    businessHours: {
      weekday: '',
      saturday: '',
      sunday: '',
    },
  });

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContent(formData);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="767 615 4170"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contactLocation">Location</Label>
            <Input
              id="contactLocation"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Fortune, Dominica"
            />
          </div>

          <div>
            <Label className="mb-2 block">Business Hours</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="w-32 text-sm text-muted-foreground">Monday - Friday</span>
                <Input
                  value={formData.businessHours.weekday}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessHours: { ...formData.businessHours, weekday: e.target.value },
                    })
                  }
                  placeholder="9:00 AM - 6:00 PM"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-32 text-sm text-muted-foreground">Saturday</span>
                <Input
                  value={formData.businessHours.saturday}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessHours: { ...formData.businessHours, saturday: e.target.value },
                    })
                  }
                  placeholder="10:00 AM - 4:00 PM"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-32 text-sm text-muted-foreground">Sunday</span>
                <Input
                  value={formData.businessHours.sunday}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessHours: { ...formData.businessHours, sunday: e.target.value },
                    })
                  }
                  placeholder="By Appointment"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
