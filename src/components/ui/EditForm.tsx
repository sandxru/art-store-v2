"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Spinner from "@/components/ui/Spinner";
import { addOrder } from "@/lib/updateordersubmit";

type Order = {
  id: number;
  cname: string;
  delivery: number;
  status: "p" | "c";
  notes: string;
  photo: string;
  frameID: number;
  price: number;
  contact: string;
  createdAt: string;
  updatedAt: string;
  address: string;
};

type EditFormProps = {
  order: Order;
};

const EditForm = ({ order }: EditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Order>(order);

  useEffect(() => {
    setFormData(order);
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addOrder(new FormData(e.currentTarget as HTMLFormElement));

      // Show success alert dialog
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Failed to update the order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post" className="relative">
      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
          isSubmitting ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="grid gap-3">
          <Input
            id="id"
            name="id"
            type="number"
            defaultValue={formData.id}
            className="hidden"
          />

          <Input
            id="oldphoto"
            name="oldphoto"
            type="text"
            defaultValue={formData.photo}
            className="hidden"
          />
          <Label>Customer Name</Label>

          <Input
            id="cname"
            name="cname"
            type="text"
            defaultValue={formData.cname}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label>Method</Label>
          <Select
            name="delivery"
            value={formData.delivery.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, delivery: parseInt(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Courier</SelectItem>
                <SelectItem value="0">Pick-up</SelectItem>
                <SelectItem value="2">Softcopy Only</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label>Frame</Label>
          <Select
            name="frameID"
            defaultValue={formData.frameID.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, frameID: parseInt(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">No frame</SelectItem>
                <SelectItem value="1">6 x 8</SelectItem>
                <SelectItem value="3">8 x 12</SelectItem>
                <SelectItem value="5">12 x 18</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label>Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            defaultValue={formData.price}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label>Contact Info</Label>
          <Input
            id="contact"
            type="text"
            name="contact"
            defaultValue={formData.contact}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label>Image</Label>
          <Input id="photo" type="file" name="photo" accept="image/*" />
        </div>

        <div className="grid gap-3 col-span-1 md:col-span-2 md:justify-end">
          <Image
            src={formData.photo}
            alt="Order Image"
            width={1080}
            height={1080}
            className="h-24 w-auto p-0 border-white border-4 rounded-lg drop-shadow"
          />
        </div>

        <div className="grid gap-3 col-span-1 md:col-span-2">
          <Label>Notes</Label>
          <Textarea
            id="note"
            name="notes"
            rows={6}
            defaultValue={formData.notes}
          />
        </div>

        <div className="grid gap-3 col-span-1 md:col-span-2">
          <Label>Address</Label>
          <Textarea
            id="address"
            name="address"
            rows={6}
            defaultValue={formData.address}
          />
        </div>

        <div className="grid gap-3 col-span-1 md:col-span-2">
          <Button type="submit" disabled={isSubmitting}>
            Update
          </Button>
        </div>
      </div>

      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <Spinner />
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Success!</AlertDialogTitle>
          <AlertDialogDescription>
            The order has been updated successfully.
          </AlertDialogDescription>
          <AlertDialogAction onClick={() => window.location.reload()}>
            OK
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default EditForm;
