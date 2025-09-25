import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Event } from '@/types/event';
import api from '@/lib/api';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequirements: string;
    address?: string;
    city?: string;
    postalCode?: string;
    deliveryInstructions?: string;
}

interface BookingModalProps {
    event: Event;
    isOpen: boolean;
    onClose: () => void;
}

export function BookingModal({ event, isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequirements: '',
        address: '',
        city: '',
        postalCode: '',
        deliveryInstructions: ''
    });
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            setErrorMessage(null);

            // Calculate total amount including delivery fee for cash payment
            const totalAmount = paymentMethod === 'cash'
                ? (event.price || 0) + 50
                : (event.price || 0);

            // Prepare enrollment data
            const enrollmentData = {
                eventId: event.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                paymentMethod,
                paymentAmount: totalAmount,
                transactionId: paymentMethod === 'online' ? Date.now().toString() : undefined
            };

            // Submit enrollment
            const response = await api.post('/api/events_enrollments', enrollmentData);
        
            if (response.data.success) {
                alert('Booking successful! You will receive a confirmation on WhatsApp.');
                onClose();
            } else {
                setErrorMessage('Unable to complete booking. Please try again.');
            }
        } catch (error: any) {
            console.error('Booking error:', error);
            setErrorMessage(
                error.response?.data?.error ||
                'There was an error processing your booking. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Book Event: {event.title}</DialogTitle>
                    <DialogDescription>
                        {event.event_date} at {event.event_time}
                    </DialogDescription>
                </DialogHeader>

                {step === 1 ? (
                    // Step 1: Personal Details
                    <>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">WhatsApp Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your WhatsApp number"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specialRequirements">Special Requirements</Label>
                                <Input
                                    id="specialRequirements"
                                    name="specialRequirements"
                                    value={formData.specialRequirements}
                                    onChange={handleInputChange}
                                    placeholder="Any special requirements?"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button
                                onClick={() => setStep(2)}
                                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                            >
                                Continue to Payment
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    // Step 2: Payment
                    <>
                        <div className="space-y-4 py-4">
                            <div className="rounded-lg bg-muted p-4">
                                <h4 className="font-medium mb-2">Booking Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Event:</span> {event.title}</p>
                                    <p><span className="font-medium">Date:</span> {event.event_date}</p>
                                    <p><span className="font-medium">Time:</span> {event.event_time}</p>
                                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Payment Details Section */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Payment Method</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="upi"
                                            name="paymentMethod"
                                            value="online"
                                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                            onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cash')}
                                            checked={paymentMethod === 'online'}
                                        />
                                        <Label htmlFor="upi">UPI Payment</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="cash"
                                            name="paymentMethod"
                                            value="cash"
                                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                            onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cash')}
                                            checked={paymentMethod === 'cash'}
                                        />
                                        <Label htmlFor="cash">Cash on Delivery</Label>
                                    </div>
                                </div>

                                {paymentMethod === 'online' && (
                                    <div className="space-y-4 mt-4 p-4 border rounded-lg">
                                        <h5 className="font-medium text-sm">UPI Payment Details</h5>
                                        <div className="space-y-4">
                                            <div className="text-center p-4 bg-muted/30 rounded-lg">
                                                <div className="qr-code-placeholder w-48 h-48 mx-auto mb-4 bg-white p-4 rounded-lg">
                                                    {/* Add actual QR code component here */}
                                                    <img
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=YOUR_UPI_ID@ybl&pn=FLOWER_SHOP&am=${event.price || 0}&cu=INR&tn=${event.title}`}
                                                        alt="UPI QR Code"
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <p className="text-sm font-medium mb-2">Scan QR code with any UPI app</p>
                                                <div className="flex justify-center space-x-4">
                                                    <img src="/gpay-icon.png" alt="Google Pay" className="h-8" />
                                                    <img src="/phonepe-icon.png" alt="PhonePe" className="h-8" />
                                                    <img src="/paytm-icon.png" alt="Paytm" className="h-8" />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-sm mb-2">Or pay using UPI ID</p>
                                                <div className="flex items-center justify-center gap-2 bg-white p-2 rounded border">
                                                    <span className="font-medium text-primary">YOUR_UPI_ID@ybl</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText('YOUR_UPI_ID@ybl');
                                                            alert('UPI ID copied to clipboard!');
                                                        }}
                                                    >
                                                        Copy
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'cash' && (
                                    <div className="space-y-4 mt-4 p-4 border rounded-lg">
                                        <h5 className="font-medium text-sm">Delivery Address</h5>
                                        <div className="grid gap-2">
                                            <Input
                                                id="address"
                                                name="address"
                                                placeholder="Street Address"
                                                value={formData.address || ''}
                                                onChange={handleInputChange}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    placeholder="City"
                                                    value={formData.city || ''}
                                                    onChange={handleInputChange}
                                                />
                                                <Input
                                                    id="postalCode"
                                                    name="postalCode"
                                                    placeholder="Postal Code"
                                                    value={formData.postalCode || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <Input
                                                id="deliveryInstructions"
                                                name="deliveryInstructions"
                                                placeholder="Delivery Instructions (Optional)"
                                                value={formData.deliveryInstructions || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span>Event Price:</span>
                                        <span className="font-medium">₹{event.price || 0}</span>
                                    </div>
                                    {paymentMethod === 'cash' && (
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span>Delivery Fee:</span>
                                            <span className="font-medium">₹50</span>
                                        </div>
                                    )}
                                    <Separator className="my-2" />
                                    <div className="flex justify-between items-center font-medium">
                                        <span>Total Amount:</span>
                                        <span className="text-lg text-primary">
                                            ₹{paymentMethod === 'cash' ? (event.price || 0) + 50 : event.price || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                            <Button
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Confirm Payment"}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
