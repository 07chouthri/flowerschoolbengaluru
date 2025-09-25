import { useState, useEffect } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminClasses } from "@/components/AdminClasses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  instock: boolean;
  featured: boolean;
  stockquantity: number;
  subcategory?: string;
  createdat: string;
}

interface Order {
  order_id: string;
  customername: string;
  email: string;
  phone: string;
  status: string;
  ordernumber: string;
  paymentmethod: string;
  product_id: string;
  product_name: string;
  price: number;
  image: string;
  created_at?: string;
}
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Calendar as CalendarIcon,
  GraduationCap,
  BarChart3,
  Settings,
  Plus,
  Upload,
  Eye,
  Edit,
  Trash2,
  X,
  Home,
  ArrowLeft,
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import flowerSchoolLogo from "@/assets/flower-school-logo.png";
import api from '@/lib/api';


// Product categories array
const productCategories = [
  "Gift",
  "Celebration Flowers",
  "Flower & Teddy Combos",
  "Office Desk Flowers",
  "Orchids",
  "Flower Garlands",
  "Wedding Floral Decor",
  "Flowers with Cheese",
  "Anniversary Flowers",
  "Lilies",
  "Mixed Flowers",
  "Garden Collection",
  "Popular Flowers",
  "Corporate Services",
  "Pink Carnations",
  "Exotic Coloured",
  "Gifts Mood",
  "Fish Bowl Exotic",
  "Orchid Anthurium",
  "Purple",
  "Compote Vase",
  "Babys Breath",
  "Wine Bottle",
  "Coloured Roses",
  "Rebloomed Bottles",
  "Yellow Chrysanthemums & Gerbera in Wine Glass",
  "Diwali Flowerbox",
  "Flowerbox",
  "Delivery Services",
  "Anthurium",
  "Exotic Arrangements",
  "Sympathy Funeral Flowers",
  "Flowers with Nuts",
  "Flower with Cakes",
  "Customized Message Cards",
  "Brand Themed Floral",
  "Pet Memorial Flowers",
  "Birthday Flowers",
  "Anniversary Flowers",
  "Wedding Flowers",
  "Valentine's Day Flowers",
  "Mother's Day Flowers",
  "Get Well Soon Flowers",
  "Congratulations Flowers",
  "Sympathy & Funeral Flowers",
  "New Baby Flowers",
  "Graduation Flowers",
  "Housewarming Flowers",
  "Retirement Flowers",
  "Christmas Flowers",
  "New Year Flowers",
  "Bouquets (hand-tied, wrapped)",
  "Flower Baskets",
  "Flower Boxes",
  "Vase Arrangements",
  "Floral Centerpieces",
  "Lobby Arrangements",
  "Exotic Arrangements",
  "Floral Cross Arrangement",
  "Baby's Breath Arrangement",
  "Gladiolus Arrangement",
  "Wine Bottle Arrangements",
  "Floral Wreaths",
  "Custom Arrangements",
  "Tulips",
  "Lilies",
  "Carnations",
  "Orchids",
  "Sunflowers",
  "Mixed Flowers",
  "Roses",
  "Baby's Breath",
  "Chrysanthemum",
  "Hydrangea",
  "Anthurium",
  "Calla Lilies",
  "Gerberas",
  "Peonies",
  "Flowers with Greeting Cards",
  "Flower with Fruits",
  "Floral Gift Hampers",
  "Flower with Chocolates",
  "Flower with Cakes",
  "Flowers with Cheese",
  "Flowers with Nuts",
  "Flowers with Customized Gifts",
  "Flowers with Wine",
  "Flowers with Perfume",
  "Flowers with Jewelry",
  "Flowers with Teddy Bears",
  "Flowers with Scented Candles",
  "Flowers with Personalized Items",
  "Wedding Floral Decor",
  "Corporate Event Flowers",
  "Party Flower Decorations",
  "Stage & Backdrop Flowers",
  "Car Decoration Flowers",
  "Temple / Pooja Flowers",
  "Birthday Decorations",
  "Entrance Arrangements",
  "Table Centerpieces",
  "Aisle Decorations",
  "Archway Flowers",
  "Ceiling Installations",
  "Wall Decorations",
  "Outdoor Event Flowers",
  "Same-Day Flower Delivery",
  "Next Day Delivery",
  "Customized Message Cards",
  "Floral Subscriptions Weekly/monthly",
  "International Delivery",
  "Express Delivery",
  "Scheduled Delivery",
  "Flower Arrangement Workshops",
  "Custom Bouquet Design",
  "Event Florist Services",
  "Floral Consultation",
  "Wedding Florist Services",
  "Corporate Account Services",
  "Subscription Services",
  "Pet Memorial Flowers",
  "Funeral Wreaths",
  "Condolence Bouquets",
  "Remembrance Flowers",
  "Memorial Sprays",
  "Casket Arrangements",
  "Sympathy Hearts",
  "Funeral Home Delivery",
  "Church Arrangements",
  "Graveside Flowers",
  "Memorial Service Flowers",
  "Sympathy Gift Baskets",
  "Living Tributes",
  "Memorial Donations",
  "Office Desk Flowers",
  "Reception Area Flowers",
  "Corporate Gifting Flowers",
  "Brand-Themed Floral Arrangements",
  "Conference Room Flowers",
  "Executive Office Arrangements",
  "Lobby Displays",
  "Corporate Accounts",
  "Volume Discounts",
  "Regular Maintenance",
  "Custom Corporate Designs",
  "Event Floristry Services",
  "Branded Arrangements",
  "Long-term Contracts"
];

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Function to get base64 size in MB
  const getBase64Size = (base64String: string): number => {
    const padding = base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0;
    const base64Length = base64String.length;
    const actualLength = (base64Length * 0.75) - padding;
    return actualLength / (1024 * 1024); // Convert to MB
  };

  // Function to compress and resize image with dynamic quality
  const compressImage = async (file: File, targetSizeInMB: number = 1): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
          // Start with these dimensions
          let maxWidth = 800;
          let maxHeight = 800;
          let quality = 0.7;
          let attempt = 0;
          let compressedDataUrl: string;

          // Function to compress with current settings
          const tryCompression = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate dimensions
            if (width > height && width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Could not get canvas context'));
              return null;
            }
            
            ctx.drawImage(img, 0, 0, width, height);
            return canvas.toDataURL('image/jpeg', quality);
          };

          // Try compression with increasingly aggressive settings
          do {
            attempt++;
            compressedDataUrl = tryCompression()!;
            const currentSize = getBase64Size(compressedDataUrl);

            if (currentSize <= targetSizeInMB) {
              break;
            }

            // Adjust compression settings for next attempt
            if (attempt === 1) {
              quality = 0.5; // Try with lower quality first
            } else if (attempt === 2) {
              quality = 0.3;
              maxWidth = 600;
              maxHeight = 600;
            } else if (attempt === 3) {
              quality = 0.2;
              maxWidth = 400;
              maxHeight = 400;
            } else {
              // If we still can't get it small enough, warn the user
              console.warn(`Could not compress image below ${currentSize}MB`);
              break;
            }
          } while (attempt < 4);

          resolve(compressedDataUrl);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // Check authentication first
      const token = localStorage.getItem('sessionToken');
      const isAdmin = localStorage.getItem('isAdmin') === 'true';

      if (!token || !isAdmin) {
        window.location.href = '/login';
        return;
      }

      try {
        // Fetch products
        const productsResponse = await api.get('/api/admin/products');
        if (productsResponse.status === 200 && productsResponse.data) {
          const formattedProducts = productsResponse.data.map(product => ({
            ...product,
            price: parseFloat(product.price),
            stockquantity: parseInt(product.stockquantity),
            instock: product.instock ?? product.stockquantity > 0
          }));
          setProducts(formattedProducts);
        }

        // Fetch orders
        const ordersResponse = await api.get('/api/admin/orders');
        if (ordersResponse.status === 200 && ordersResponse.data) {
          setOrders(ordersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive",
        });
      }
    };

    checkAuthAndFetchData();
  }, []);



  const sidebarItems = [
    { title: "Dashboard", id: "dashboard", icon: LayoutDashboard, description: "Overview & Stats" },
    { title: "Products", id: "products", icon: Package, description: "Manage Inventory" },
    { title: "Orders", id: "orders", icon: ShoppingCart, description: "Customer Orders" },
    { title: "Classes", id: "classes", icon: GraduationCap, description: "Educational Programs" },
    { title: "Calendar", id: "calendar", icon: CalendarIcon, description: "Schedule & Events" },
    { title: "Students", id: "students", icon: Users, description: "Student Management" },
    { title: "Settings", id: "settings", icon: Settings, description: "System Settings" },
  ];

  const stats = [
    { title: "Total Revenue", value: "$45,210", change: "+18%", color: "text-green-600", description: "Total sales including classes and products" },
    { title: "Orders This Month", value: "234", change: "+12%", color: "text-blue-600", description: "Flower arrangements and gifts sold" },
    { title: "Active Students", value: "1,234", change: "+7%", color: "text-purple-600", description: "Students enrolled in ongoing programs" },
    { title: "Classes Completed", value: "48", change: "+23%", color: "text-orange-600", description: "Workshops and masterclasses conducted" },
    { title: "Satisfaction Rate", value: "4.9/5", change: "+0.2", color: "text-yellow-600", description: "Average customer rating" },
    { title: "Inventory Items", value: "856", change: "+5%", color: "text-pink-600", description: "Fresh flowers and supplies in stock" },
  ];


  const classes = [
    { id: 1, name: "Basic Flower Arrangement", instructor: "Sarah Johnson", date: "2024-01-15", students: 8, capacity: 12, status: "Active" },
    { id: 2, name: "Wedding Bouquet Masterclass", instructor: "Emily Chen", date: "2024-01-20", students: 6, capacity: 8, status: "Active" },
    { id: 3, name: "Kids Floral Art Workshop", instructor: "Mike Rodriguez", date: "2024-01-22", students: 12, capacity: 15, status: "Active" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": {
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your flower business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${stat.color} bg-current/10`}>
                        {stat.change}
                      </div>
                    </div>
                    <p className="font-medium text-foreground mb-1">{stat.title}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #{order}001</p>
                          <p className="text-sm text-muted-foreground">Red Rose Bouquet</p>
                        </div>
                        <Badge>Processing</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes.slice(0, 3).map((cls) => (
                      <div key={cls.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{cls.name}</p>
                          <p className="text-sm text-muted-foreground">{cls.date}</p>
                        </div>
                        <span className="text-sm">{cls.students}/{cls.capacity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      }

      case "products": {
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Product Management</h1>
              <Button onClick={() => setShowProductForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            {showProductForm && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Add New Product</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setShowProductForm(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    try {
                      const formData = new FormData(e.currentTarget);
                      const productData = {
                        name: formData.get('name')?.toString() || '',
                        description: formData.get('description')?.toString() || '',
                        price: parseFloat(formData.get('price')?.toString() || '0'),
                        category: formData.get('category')?.toString() || '',
                        stockquantity: Math.max(0, parseInt(formData.get('stockQuantity')?.toString() || '0')),
                        instock: true,
                        featured: formData.get('featured') === 'true',
                        images: imageFiles, // All images will be split into separate fields in the backend
                        // Database fields will be mapped in the backend:
                        // imagefirst, imagesecond, imagethirder, imagefoure, imagefive
                      };

                      const response = await api.post('/api/admin/products', productData);
                      if (response.status === 201) {
                        setProducts([response.data, ...products]);
                        setShowProductForm(false);
                        // Show success message
                        toast({
                          title: "Success",
                          description: "Product created successfully",
                          variant: "default",
                        });
                      }
                    } catch (error) {
                      console.error('Error creating product:', error);
                      // Show error message
                      toast({
                        title: "Error",
                        description: "Failed to create product. Please try again.",
                        variant: "destructive",
                      });
                    } finally {
                      setIsLoading(false);
                    }
                  }}>
                    {/* Multiple Image Upload with Previews - Important Field 1 */}
                    <div className="space-y-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                                              <div className="flex items-center justify-between">
                        <Label htmlFor="image">Product Images (Select up to 4)</Label>
                        <span className="text-sm text-muted-foreground">
                          {imageFiles.length}/4 images
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="flex-1"
                            onChange={async (e) => {
                              const files = e.target.files;
                              if (!files) return;

                              const file = files[0];
                              if (!file) return;

                              // Check if we've reached the limit
                              if (imageFiles.length >= 4) {
                                toast({
                                  title: "Error",
                                  description: "Maximum 4 images allowed",
                                  variant: "destructive",
                                });
                                return;
                              }

                              try {
                                if (file.size > 15 * 1024 * 1024) { // Allow larger initial files
                                  toast({
                                    title: "Error",
                                    description: `Image ${file.name} exceeds 15MB limit`,
                                    variant: "destructive",
                                  });
                                  return;
                                }

                                // Show loading state
                                toast({
                                  title: "Processing",
                                  description: "Optimizing image...",
                                });

                                // Target size of 0.8MB for each image
                                const compressedImage = await compressImage(file, 0.8);
                                
                                // Verify final size
                                const finalSizeMB = getBase64Size(compressedImage);
                                
                                if (finalSizeMB > 1) {
                                  toast({
                                    title: "Warning",
                                    description: `Image compressed to ${finalSizeMB.toFixed(1)}MB. Upload may fail.`,
                                    variant: "destructive",
                                  });
                                  return;
                                }

                                // Success - add the image
                                setImageFiles(prev => [...prev, compressedImage]);
                                
                                toast({
                                  title: "Success",
                                  description: `Image compressed to ${finalSizeMB.toFixed(1)}MB`,
                                });
                              } catch (error) {
                                console.error('Error processing image:', error);
                                toast({
                                  title: "Error",
                                  description: "Failed to process image",
                                  variant: "destructive",
                                });
                              }

                              // Clear the input value to allow selecting the same file again
                              e.target.value = '';
                            }}
                          />
                          {imageFiles.length > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => setImageFiles([])}
                            >
                              Clear All
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">
                          Click or drag files to add images. Maximum 4 images allowed. 
                          Supported formats: JPG, PNG, WebP
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {imageFiles.map((image, index) => (
                            <div key={index} className="relative group aspect-square">
                              <div className="absolute inset-0 rounded-lg overflow-hidden border border-border">
                                <img
                                  src={image}
                                  alt={`Product preview ${index + 1}`}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  className="p-1.5 rounded-full bg-white/90 text-gray-700 hover:bg-white"
                                  onClick={() => {
                                    setImageFiles(imageFiles.filter((_, i) => i !== index));
                                  }}
                                  title="Remove image"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                Image {index + 1}
                              </span>
                            </div>
                          ))}
                          
                          {imageFiles.length < 4 && (
                            <label
                              htmlFor="image"
                              className="aspect-square border-2 border-dashed border-primary/20 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 transition-colors"
                            >
                              <div className="p-2 rounded-full bg-primary/5">
                                <svg
                                  className="w-6 h-6 text-primary/60"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                Add image
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Product Name and Price - Important Fields 2 & 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    {/* Category Selection - Important Field 4 */}
                    <div className="space-y-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          name="category" 
                          required
                          onValueChange={(value) => setSelectedCategory(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((category) => (
                              <SelectItem 
                                key={category} 
                                value={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Stock and Description - Important Field 5 */}
                    <div className="space-y-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="stockQuantity">Stock Quantity</Label>
                          <Input
                            id="stockQuantity"
                            name="stockQuantity"
                            type="number"
                            min="0"
                            placeholder="0"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Product description"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        name="featured"
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Product"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowProductForm(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Product List</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {products.length} {products.length === 1 ? 'product' : 'products'} total
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Package className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product: Product) => (
                    <div 
                      key={product.id} 
                      className="group relative bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="aspect-square overflow-hidden relative">
                        {product.image ? (
                          <img
                            src={product.image.startsWith('data:') ? product.image : `data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
                        
                        {/* Quick Action Buttons Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            title="View Details"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsViewModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            title="Edit Product"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            title="Delete Product"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                          <Badge 
                            variant={product.instock ? "default" : "destructive"}
                            className="shadow-sm"
                          >
                            {product.instock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          {product.featured && (
                            <Badge variant="secondary" className="shadow-sm">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium line-clamp-2">{product.name}</h3>
                          <p className="font-bold text-lg">₹{product.price}</p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Stock: {product.stockquantity}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {product.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 gap-2">
                    <Package className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No products found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      }
      
      case "orders": {
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Order Management</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Order List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.map((order) => (
                    <div 
                      key={order.order_id} 
                      className="border rounded-lg bg-card hover:shadow-lg transition-all duration-200"
                    >
                      {/* Order Header */}
                      <div className="p-4 border-b border-border bg-muted/30">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Order #{order.ordernumber}</h3>
                            <p className="text-sm text-muted-foreground">{order.customername}</p>
                          </div>
                          <Badge 
                            variant={
                              order.status === 'completed' ? 'default' :
                              order.status === 'pending' ? 'secondary' :
                              order.status === 'cancelled' ? 'destructive' : 
                              'outline'
                            }
                            className="ml-2"
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Order Content */}
                      <div className="p-4">
                        <div className="flex gap-4 mb-4">
                          {order.image && (
                            <img
                              src={order.image.startsWith('data:') ? order.image : `data:image/jpeg;base64,${order.image}`}
                              alt={order.product_name}
                              className="w-20 h-20 object-cover rounded-md border border-border flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{order.product_name}</p>
                            <p className="text-sm text-muted-foreground">₹{order.price}</p>
                            <p className="text-sm text-muted-foreground">{order.paymentmethod}</p>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-1 text-sm text-muted-foreground mb-4">
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {order.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {order.phone}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsViewOrderModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsEditOrderModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {orders.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 gap-2">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* View Order Details Modal */}
            <Dialog open={isViewOrderModalOpen} onOpenChange={setIsViewOrderModalOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                  <DialogDescription>
                    Complete information about the order
                  </DialogDescription>
                </DialogHeader>
                
                {selectedOrder && (
                  <div className="space-y-6">
                    {/* Order Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Order #{selectedOrder.ordernumber}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedOrder.created_at && 
                            new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          }
                        </p>
                      </div>
                      <Badge 
                        variant={
                          selectedOrder.status === 'completed' ? 'default' :
                          selectedOrder.status === 'pending' ? 'secondary' :
                          selectedOrder.status === 'cancelled' ? 'destructive' : 
                          'outline'
                        }
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Customer Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm text-muted-foreground">Name</dt>
                              <dd className="font-medium">{selectedOrder.customername}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Email</dt>
                              <dd>{selectedOrder.email}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Phone</dt>
                              <dd>{selectedOrder.phone}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>

                      {/* Product Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-4">
                            {selectedOrder.image && (
                              <img
                                src={selectedOrder.image.startsWith('data:') ? 
                                  selectedOrder.image : 
                                  `data:image/jpeg;base64,${selectedOrder.image}`
                                }
                                alt={selectedOrder.product_name}
                                className="w-20 h-20 object-cover rounded-md border border-border"
                              />
                            )}
                            <dl className="space-y-2">
                              <div>
                                <dt className="text-sm text-muted-foreground">Product Name</dt>
                                <dd className="font-medium">{selectedOrder.product_name}</dd>
                              </div>
                              <div>
                                <dt className="text-sm text-muted-foreground">Price</dt>
                                <dd className="font-medium">₹{selectedOrder.price}</dd>
                              </div>
                            </dl>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Payment Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-2">
                          <div>
                            <dt className="text-sm text-muted-foreground">Payment Method</dt>
                            <dd className="font-medium">{selectedOrder.paymentmethod}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Payment Status</dt>
                            <dd>
                              <Badge>
                                {selectedOrder.status === 'completed' ? 'Paid' : 'Pending'}
                              </Badge>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Total Amount</dt>
                            <dd className="text-xl font-bold">₹{selectedOrder.price}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsViewOrderModalOpen(false)}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Order Status Modal */}
            <Dialog open={isEditOrderModalOpen} onOpenChange={setIsEditOrderModalOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Order Status</DialogTitle>
                  <DialogDescription>
                    Change the status of order #{selectedOrder?.ordernumber}
                  </DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label>Current Status</Label>
                      <Badge 
                        variant={
                          selectedOrder.status === 'completed' ? 'default' :
                          selectedOrder.status === 'pending' ? 'secondary' :
                          selectedOrder.status === 'cancelled' ? 'destructive' : 
                          'outline'
                        }
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Label>New Status</Label>
                      <Select
                        defaultValue={selectedOrder.status}
                        onValueChange={async (value) => {
                          try {
                            setIsLoading(true);
                            // Update order status
                            const response = await api.patch(`/api/orders/${selectedOrder.order_id}/status`, {
                              orderId: selectedOrder.order_id,
                              status: value
                            });
                            
                            if (response.status === 200) {
                              // Update orders list with new status
                              setOrders(orders.map(o => 
                                o.order_id === selectedOrder.order_id 
                                  ? { ...o, status: value }
                                  : o
                              ));
                              
                              setIsEditOrderModalOpen(false);
                              
                              toast({
                                title: "Status Updated",
                                description: `Order status changed to ${value}`,
                                variant: "default",
                              });
                            }
                          } catch (error) {
                            console.error('Error updating status:', error);
                            toast({
                              title: "Error",
                              description: "Failed to update order status",
                              variant: "destructive",
                            });
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditOrderModalOpen(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        );

      }

      case "classes": {
        return (
          <div className="container mx-auto">
            <AdminClasses />
          </div>
        );
      }

      default: {
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Select a section from the sidebar</p>
          </div>
        );
      }
    }
  };

  // Function to handle product operations
  const handleDeleteProduct = async () => {
    if (!selectedProduct?.id) return;

    setIsLoading(true);
    try {
      await api.delete(`/api/admin/products/${selectedProduct.id}`);
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (updatedData: Partial<Product>) => {
    if (!selectedProduct?.id) return;

    setIsLoading(true);
    try {
      const response = await api.put(`/api/admin/products/${selectedProduct.id}`, updatedData);
      if (response.status === 200) {
        setProducts(products.map(p => p.id === selectedProduct.id ? response.data : p));
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* View Product Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedProduct && (
              <>
                <div className="flex justify-center">
                  <img
                    src={`data:image/png;base64,${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <div className="col-span-3">{selectedProduct.name}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Price</Label>
                  <div className="col-span-3">₹{selectedProduct.price}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Category</Label>
                  <div className="col-span-3">{selectedProduct.category}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Stock</Label>
                  <div className="col-span-3">{selectedProduct.stockquantity}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <Badge variant={selectedProduct.instock ? "default" : "destructive"}>
                      {selectedProduct.instock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Description</Label>
                  <div className="col-span-3">{selectedProduct.description}</div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedData = {
                name: formData.get('name')?.toString() || '',
                price: parseFloat(formData.get('price')?.toString() || '0'),
                category: formData.get('category')?.toString() || '',
                stockquantity: parseInt(formData.get('stockquantity')?.toString() || '0'),
                description: formData.get('description')?.toString() || '',
                instock: (formData.get('instock')?.toString() || 'false') === 'true'
              };
              handleUpdateProduct(updatedData);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedProduct.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct.price}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={selectedProduct.category}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stockquantity" className="text-right">Stock</Label>
                  <Input
                    id="stockquantity"
                    name="stockquantity"
                    type="number"
                    defaultValue={selectedProduct.stockquantity}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instock" className="text-right">Status</Label>
                  <Select name="instock" defaultValue={selectedProduct.instock ? "true" : "false"}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">In Stock</SelectItem>
                      <SelectItem value="false">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={selectedProduct.description}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedProduct && (
              <div>
                <p className="font-medium">{selectedProduct.name}</p>
                <p className="text-sm text-muted-foreground">{selectedProduct.category}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Simplified Left Sidebar */}
          <Sidebar className="hidden lg:flex w-64 border-r border-border bg-background shadow-sm">
            {/* Simple Header */}
            <div className="p-4 border-b border-border">
              <Link to="/" className="flex items-center gap-2 group">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <img
                  src={flowerSchoolLogo}
                  alt="The Flower School"
                  className="h-8 w-auto"
                />
                <div>
                  <h2 className="font-semibold text-foreground text-sm">Admin</h2>
                </div>
              </Link>
            </div>

            {/* Simple Navigation */}
            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {sidebarItems.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <IconComponent className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content Area - Responsive */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Mobile-friendly Top Header */}
            <header className="h-16 lg:h-20 border-b border-border bg-background/95 backdrop-blur shadow-sm">
              <div className="flex items-center justify-between h-full px-4 lg:px-8">
                <div className="flex items-center gap-3 lg:gap-6">
                  <SidebarTrigger className="lg:hidden" />
                  <div>
                    <h1 className="font-bold text-xl lg:text-2xl text-foreground">
                      {sidebarItems.find(item => item.id === activeTab)?.title || "Dashboard"}
                    </h1>
                    <p className="text-xs lg:text-sm text-muted-foreground font-medium hidden sm:block">
                      {sidebarItems.find(item => item.id === activeTab)?.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                  <Link to="/">
                    <Button variant="outline" size="sm" className="text-xs lg:text-sm">
                      <Home className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                      <span className="hidden sm:inline">Back to Site</span>
                      <span className="sm:hidden">Home</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            {/* Responsive Page Content */}
            <main className="flex-1 p-4 lg:p-8 bg-gradient-to-br from-background to-muted/20 overflow-auto">
              <div>
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;