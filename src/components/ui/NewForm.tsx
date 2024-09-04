"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/textarea";
import { addOrder } from "@/lib/newordersubmit";
import { useState } from "react";

const NewForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Submit the form data
      await addOrder(new FormData(e.currentTarget as HTMLFormElement));

      // Show success alert dialog
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Failed to add the order:", error);
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
          <Label>Customer Name</Label>
          <Input id="cname" name="cname" type="text" required />
        </div>

        <div className="grid gap-3">
          <Label>Method</Label>
          <Select
            onValueChange={(value) =>
              ((document.getElementById("delivery") as HTMLInputElement).value =
                value)
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
          <input type="hidden" id="delivery" name="delivery" />
        </div>

        <div className="grid gap-3">
          <Label>Frame</Label>
          <Select
            onValueChange={(value) =>
              ((document.getElementById("frameID") as HTMLInputElement).value =
                value)
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
          <input type="hidden" id="frameID" name="frameID" />
        </div>

        <div className="grid gap-3">
          <Label>Price</Label>
          <Input id="price" type="number" name="price" required />
        </div>

        <div className="grid gap-3">
          <Label>Contact Info</Label>
          <Input id="contact" type="text" name="contact" required />
        </div>

        <div className="grid gap-3">
          <Label>Image</Label>
          <Input
            id="photo"
            type="file"
            name="photo"
            required
            accept="image/*"
          />
        </div>

        <div className="grid gap-3 col-span-1 md:col-span-2">
          <Label>Notes</Label>
          <Textarea id="note" name="notes" rows={6} />
        </div>

        <div className="grid gap-3 col-span-1 md:col-span-2">
          <Label>Address</Label>
          <Textarea id="address" name="address" rows={6} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <Button type="reset" disabled={isSubmitting}>
          Reset
        </Button>
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
            The order has been added successfully.
          </AlertDialogDescription>
          <AlertDialogAction onClick={() => window.location.reload()}>
            OK
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default NewForm;
