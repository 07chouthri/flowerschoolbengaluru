import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, Edit, Trash2 } from "lucide-react";
import api from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

interface ClassData {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  sessions: number;
  features: any[];
  popular: boolean;
  nextbatch: string;
  created_at: string;
  image: string;
  category: string;
}

export function AdminClasses() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    sessions: '',
    features: [{ topic: '' }],
    nextbatch: '',
    category: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/api/admin/AdminClasses');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Classes & Programs</h2>
          <p className="text-muted-foreground">
            Manage your educational offerings and course details
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Class
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              try {
                const classData = {
                  ...formData,
                  price: parseFloat(formData.price),
                  sessions: parseInt(formData.sessions),
                  image: imageFile,
                  features: formData.features.filter(f => f.topic.trim() !== '')
                };

                const response = await api.post('/api/admin/AdminClasses/Add', classData);
                if (response.status === 201) {
                  setClasses([response.data, ...classes]);
                  setShowAddForm(false);
                  setFormData({
                    title: '',
                    description: '',
                    price: '',
                    duration: '',
                    sessions: '',
                    features: [{ topic: '' }],
                    nextbatch: '',
                    category: ''
                  });
                  setImageFile('');
                  toast({
                    title: "Success",
                    description: "Class created successfully",
                    variant: "default",
                  });
                }
              } catch (error) {
                console.error('Error creating class:', error);
                toast({
                  title: "Error",
                  description: "Failed to create class",
                  variant: "destructive",
                });
              }
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input 
                    id="duration" 
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessions">Number of Sessions</Label>
                  <Input 
                    id="sessions" 
                    type="number" 
                    required
                    value={formData.sessions}
                    onChange={(e) => setFormData({ ...formData, sessions: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextbatch">Next Batch Start Date</Label>
                <Input 
                  id="nextbatch"
                  type="date"
                  required
                  value={formData.nextbatch}
                  onChange={(e) => setFormData({ ...formData, nextbatch: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Features/Topics</Label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature.topic}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = { topic: e.target.value };
                        setFormData({ ...formData, features: newFeatures });
                      }}
                      placeholder="Enter topic"
                    />
                    {index === formData.features.length - 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormData({
                          ...formData,
                          features: [...formData.features, { topic: '' }]
                        })}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="text-destructive"
                        onClick={() => {
                          const newFeatures = formData.features.filter((_, i) => i !== index);
                          setFormData({ ...formData, features: newFeatures });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Class Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setImageFile(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {imageFile && (
                  <div className="mt-2">
                    <img
                      src={imageFile}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Class
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading classes...</p>
        ) : classes.length === 0 ? (
          <p>No classes found</p>
        ) : (
          classes.map((classItem) => (
            <Card key={classItem.id} className="overflow-hidden">
              <div className="aspect-video relative">
                {classItem.image ? (
                  <img
                    src={classItem.image.startsWith('data:') ? classItem.image : `data:image/jpeg;base64,${classItem.image}`}
                    alt={classItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                {classItem.popular && (
                  <Badge className="absolute top-2 right-2">
                    Popular
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle>{classItem.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{classItem.category}</span>
                  <span className="font-bold">₹{classItem.price}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Duration:</span> {classItem.duration}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Sessions:</span> {classItem.sessions}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Next Batch:</span> {classItem.nextbatch || 'TBA'}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>

                  <div className="pt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}