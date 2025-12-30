import { useEffect, useState } from 'react';
import { useSiteContent, ServicesContent, ServiceItem } from '@/hooks/useSiteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export const ServicesEditor = () => {
  const { content, isLoading, saveContent, isSaving } = useSiteContent<ServicesContent>('services');
  const [formData, setFormData] = useState<ServicesContent>({
    title: '',
    description: '',
    items: [],
  });
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContent(formData);
  };

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const updateService = (index: number, field: keyof ServiceItem, value: string | string[]) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, items: updated });
  };

  const addFeature = (serviceIndex: number) => {
    const updated = [...formData.items];
    updated[serviceIndex].features = [...updated[serviceIndex].features, ''];
    setFormData({ ...formData, items: updated });
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const updated = [...formData.items];
    updated[serviceIndex].features = updated[serviceIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    setFormData({ ...formData, items: updated });
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const updated = [...formData.items];
    updated[serviceIndex].features[featureIndex] = value;
    setFormData({ ...formData, items: updated });
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
        <CardTitle>Services Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="servicesTitle">Section Title</Label>
            <Input
              id="servicesTitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="servicesDescription">Section Description</Label>
            <Textarea
              id="servicesDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          {/* Service Items */}
          <div>
            <Label className="mb-2 block">Services</Label>
            <div className="space-y-4">
              {formData.items.map((service, index) => (
                <Collapsible
                  key={index}
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                >
                  <div className="border rounded-lg">
                    <CollapsibleTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto"
                      >
                        <span className="font-medium">{service.title || `Service ${index + 1}`}</span>
                        {openItems.includes(index) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={service.title}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Features</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addFeature(index)}
                          >
                            <Plus className="w-4 h-4 mr-1" /> Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) => updateFeature(index, fIndex, e.target.value)}
                                placeholder="Feature"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFeature(index, fIndex)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
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
