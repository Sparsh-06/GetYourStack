"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "@/utils/options";
import { TableDemo } from "./components/Itables";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  ideaUrl: string;
  ideaTitle: string;
  devName: string;
  ideaTag: string;
  ideaComp: string;
  isOpenSource: boolean;
  ideaDescription: string;
  selectedTechnologies: string[];
}

const Page = () => {
  const { toast } = useToast();
  const animatedComponents = makeAnimated();
  const [formData, setFormData] = useState<FormData>({
    devName: "",
    ideaUrl: "",
    ideaTitle: "",
    ideaComp:"",
    ideaTag: "",
    isOpenSource: false,
    ideaDescription: "",
    selectedTechnologies: [],
  });

  

  const [isSending, setisSending] = useState(false);
  const [isSucesss, setisSucesss] = useState(false);
  

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle multi-select change
  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prev) => ({
      ...prev,
      selectedTechnologies: selectedValues,
    }));
  };

  const handleIdeaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSending(true); // Open the modal
    console.log("Idea that is to be submitted", formData);
    try {
      const response = await fetch(
        "http://localhost:3200/response/api/submit-idea",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      
      if (!response.ok) throw new Error("Submission failed");

      const data = await response.json();
      console.log("Success:", data);
      setisSending(false); // Close the modal on success\
      toast({
        variant: "default",
        title: "Idea Submitted Successfully",
        description: "Your idea has been submitted successfully",
      });
      setisSucesss(true);
    } catch (error) {
      console.error("Error:", error);
      setisSending(false); // Close the modal on error
    }
  };

  return (
    <div className="container h-screen py-[14vh]">
      <h2 className="text-4xl text-foreground text-center">
        Validate your Ideas
      </h2>
      <Card className="max-w-5xl mx-auto mt-16 p-5 bg-black/40">
        <form onSubmit={handleIdeaSubmit}>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="ideaUrl" className="text-foreground">
                  Link to the product
                </Label>
                <Input
                  type="url"
                  id="ideaUrl"
                  value={formData.ideaUrl}
                  onChange={handleInputChange}
                  placeholder="https://getyourstack.com"
                  className="w-full p-2 bg-slate-800 text-white mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="devName" className="text-foreground">
                  Developer Name
                </Label>
                <Input
                  type="text"
                  id="devName"
                  value={formData.devName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full p-2 bg-slate-800 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ideaTitle" className="text-white">
                  Name of the Product
                </Label>
                <Input
                  type="text"
                  id="ideaTitle"
                  value={formData.ideaTitle}
                  onChange={handleInputChange}
                  placeholder="GetYourStack"
                  className="w-full p-2 bg-slate-800 text-white mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ideaTag" className="text-white">
                Tagline
              </Label>
              <Input
                type="text"
                id="ideaTag"
                value={formData.ideaTag}
                onChange={handleInputChange}
                placeholder="'Fake it till you make it'"
                className="w-full p-2 bg-slate-800 text-white mt-1"
              />
            </div>
            <div>
              <Label htmlFor="comp" className="text-white">
                Any Competitors ?
              </Label>
              <Input
                type="text"
                id="ideaComp"
                value={formData.ideaComp}
                onChange={handleInputChange}
                placeholder="Type N/A if none"
                className="w-full p-2 bg-slate-800 text-white mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOpenSource"
                checked={formData.isOpenSource}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isOpenSource: !!checked,
                  }))
                }
              />
              <Label
                htmlFor="isOpenSource"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is this an open source project?
              </Label>
            </div>

            <div className="flex-col justify-center my-10">
              <Label
                htmlFor="multiselect"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select the category of your project
              </Label>
              <Select
                id="multiselect"
                backspaceRemovesValue={true}
                closeMenuOnSelect={false}
                className="w-full text-black mt-1 "
                components={animatedComponents}
                isMulti
                options={colourOptions}
                onChange={handleSelectChange}
              />
            </div>
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture" className="text-white">
                Logo / Product-Image
              </Label>
              <Input id="picture" type="file" />
            </div> */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ideaDescription" className="text-white">
                Idea Description
              </Label>
              <Textarea
                id="ideaDescription"
                value={formData.ideaDescription}
                onChange={handleInputChange}
                placeholder="Describe your idea in detail ..."
                cols={30}
                rows={10}
                className="w-full p-2 bg-slate-800 text-white mt-1"
              />
            </div>
            <Button type="submit" variant={isSending ? "outline" : "ghost"} className="mt-4 bg-slate-800 hover:bg-white hover:text-black">
              Submit
            </Button>
          </div>
        </form>
      </Card>

      <div className="container p-16 my-10">
        <div className="my-10">
          <h2 className="text-4xl text-foreground text-center">
            Other Ideas
          </h2>
          <p className="text-md text-muted-foreground text-center">
            Here are some of the woderful ideas submitted by other developers
          </p>
        </div>
        <TableDemo/>
      </div>

      <Dialog open={isSending} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Submitting your Idea
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
