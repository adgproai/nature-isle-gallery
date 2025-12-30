import { useEffect, useState } from 'react';
import { useSiteContent, AboutContent } from '@/hooks/useSiteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, X } from 'lucide-react';

export const AboutEditor = () => {
  const { content, isLoading, saveContent, isSaving } = useSiteContent<AboutContent>('about');
  const [formData, setFormData] = useState<AboutContent>({
    title: '',
    location: '',
    locationTagline: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    notableEvents: [],
    stats: [],
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

  const addEvent = () => {
    setFormData({
      ...formData,
      notableEvents: [...formData.notableEvents, ''],
    });
  };

  const removeEvent = (index: number) => {
    setFormData({
      ...formData,
      notableEvents: formData.notableEvents.filter((_, i) => i !== index),
    });
  };

  const updateEvent = (index: number, value: string) => {
    const updated = [...formData.notableEvents];
    updated[index] = value;
    setFormData({ ...formData, notableEvents: updated });
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...formData.stats];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, stats: updated });
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
        <CardTitle>About Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="aboutTitle">Section Title</Label>
            <Input
              id="aboutTitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="locationTagline">Location Tagline</Label>
              <Input
                id="locationTagline"
                value={formData.locationTagline}
                onChange={(e) => setFormData({ ...formData, locationTagline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paragraph1">Paragraph 1</Label>
            <Textarea
              id="paragraph1"
              value={formData.paragraph1}
              onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="paragraph2">Paragraph 2</Label>
            <Textarea
              id="paragraph2"
              value={formData.paragraph2}
              onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="paragraph3">Paragraph 3</Label>
            <Textarea
              id="paragraph3"
              value={formData.paragraph3}
              onChange={(e) => setFormData({ ...formData, paragraph3: e.target.value })}
              rows={3}
            />
          </div>

          {/* Notable Events */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Notable Events</Label>
              <Button type="button" variant="outline" size="sm" onClick={addEvent}>
                <Plus className="w-4 h-4 mr-1" /> Add Event
              </Button>
            </div>
            <div className="space-y-2">
              {formData.notableEvents.map((event, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={event}
                    onChange={(e) => updateEvent(index, e.target.value)}
                    placeholder="Event name"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEvent(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            <Label className="mb-2 block">Statistics</Label>
            <div className="grid grid-cols-2 gap-4">
              {formData.stats.map((stat, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Label"
                    className="flex-1"
                  />
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="w-24"
                  />
                </div>
              ))}
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
