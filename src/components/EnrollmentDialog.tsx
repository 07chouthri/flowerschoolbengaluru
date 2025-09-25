import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface EnrollmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    courseId: string;
    batch: string;
    price: string;
}

interface EnrollmentForm {
    fullName: string;
    email: string;
    phone: string;
    questions: string;
    paymentMethod: string;
}

export function EnrollmentDialog({ isOpen, onClose, courseTitle, courseId, batch, price }: EnrollmentDialogProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState<EnrollmentForm>({
        fullName: '',
        email: '',
        phone: '',
        questions: '',
        paymentMethod: 'Cash on Delivery'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Submit enrollment
            const enrollmentResponse = await api.post('/api/enrollments', {
                ...formData,
                courseId: courseId,
                courseTitle: courseTitle,
                batch: batch,
                price: price,
                status: 'pending'
            });

            if (enrollmentResponse.data) {
                // Show success message
                toast({
                    title: "Enrollment Successful!",
                    description: "You will receive confirmation details via WhatsApp and SMS.",
                    variant: "default"
                });

                // Close both dialogs
                setShowConfirmation(false);
                onClose();
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            toast({
                title: "Enrollment Failed",
                description: "Please try again or contact support.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-[95%] mx-auto">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-xl md:text-2xl font-bold text-primary">
                        Enroll in {courseTitle}
                    </DialogTitle>
                    <DialogDescription className="text-sm md:text-base">
                        <div className="bg-muted/50 p-3 rounded-lg">
                            <p>Please fill out the form below to enroll in this course.</p>
                            <p className="mt-2 font-medium">Batch starting: {batch}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="questions">Questions or Comments (Optional)</Label>
                        <Textarea
                            id="questions"
                            name="questions"
                            placeholder="Any questions for the instructor?"
                            value={formData.questions}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</Label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="Online Payment">Online Payment</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-lg font-semibold flex items-center gap-2">
                            <span className="text-muted-foreground text-base">Total Amount:</span>
                            <span className="text-primary">₹{parseFloat(price).toLocaleString()}</span>
                        </div>
                        <Button 
                            type="button" 
                            onClick={() => setShowConfirmation(true)}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                            size="lg"
                        >
                            Review Enrollment
                        </Button>
                    </div>
                </form>

                {/* Confirmation Dialog */}
                {showConfirmation && (
                    <Dialog open={showConfirmation} onOpenChange={() => setShowConfirmation(false)}>
                        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-[95%] mx-auto">
                            <DialogHeader className="space-y-2">
                                <DialogTitle className="text-xl md:text-2xl font-bold text-primary">
                                    Confirm Enrollment
                                </DialogTitle>
                                <DialogDescription className="text-sm md:text-base">
                                    Please review your enrollment details carefully
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                                <div className="bg-muted/50 p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg md:text-xl font-bold mb-3 text-primary">Course Details</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Course:</span> 
                                            <span className="font-medium">{courseTitle}</span>
                                        </p>
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Batch:</span> 
                                            <span className="font-medium">{batch}</span>
                                        </p>
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Price:</span> 
                                            <span className="font-medium text-lg">₹{parseFloat(price).toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted/50 p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg md:text-xl font-bold mb-3 text-primary">Personal Details</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Name:</span> 
                                            <span className="font-medium">{formData.fullName}</span>
                                        </p>
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Email:</span> 
                                            <span className="font-medium">{formData.email}</span>
                                        </p>
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Phone:</span> 
                                            <span className="font-medium">{formData.phone}</span>
                                        </p>
                                        <p className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Payment Method:</span> 
                                            <span className="font-medium">{formData.paymentMethod}</span>
                                        </p>
                                    </div>
                                </div>

                                {formData.questions && (
                                    <div className="bg-muted/50 p-4 rounded-lg shadow-sm">
                                        <h3 className="text-lg md:text-xl font-bold mb-3 text-primary">Additional Questions</h3>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{formData.questions}</p>
                                    </div>
                                )}

                                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowConfirmation(false)}
                                        className="w-full sm:w-auto"
                                        size="lg"
                                    >
                                        Edit Details
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto"
                                        size="lg"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            "Confirm & Enroll"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </DialogContent>
        </Dialog>
    );
}