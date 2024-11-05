"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Idea {
  ideaTitle: string;
  devName: string;
  ideaDescription: string;
  isOpenSource: boolean;
  ideaTag: string;
  ideaComp: string;
  projectID: string;
}



const Page = ({ params }: { params: { IdeaValidateID: string } }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [content, setContent] = useState<Idea[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchIdeaForVal = async () => {
      try {
        const response = await fetch(
          `http://localhost:3200/response/api/getValidationIdeas/${params.IdeaValidateID}`
        );
        if (!response.ok) throw new Error("Failed to fetch ideas");

        const data = await response.json();
        setContent(data.data);
        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaForVal();
  }, [params.IdeaValidateID]);

  const handleVote = async (type: "upvote" | "downvote") => {
    try {
      const voteURL = `http://localhost:3200/response/api/${type}Idea/${params.IdeaValidateID}`;
      const response = await fetch(voteURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaID: content[0]?.projectID,
          feedback: comment,
          userId: user?.id,
          [`${type}Count`]: 1,
        }),
      });

      if (response.ok) {
        toast({
          variant: "default",
          title: "Success",
          description: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } recorded successfully.`,
        });
      } else {
        throw new Error(`Failed to record ${type}`);
      }
    } catch (error) {
      console.error(`Error ${type}ing:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while ${type}ing.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-[10vh]">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : content.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold text-center">Idea Validation</h1>
            <div className="mt-8 space-y-8">
              {content.map((idea) => (
                <Card
                  key={idea.projectID}
                  className="shadow-lg bg-black/30 rounded-lg p-6 border border-gray-200 max-w-3xl mx-auto"
                >
                  <CardContent className="space-y-4 max-w-2xl">
                    <div className="flex gap-5 justify-around">
                      <div>
                        <Label className="text-lg font-semibold">
                          Idea Name
                        </Label>
                        <h2 className="text-xl font-bold mt-1">
                          {idea.ideaTitle}
                        </h2>
                      </div>
                      <div>
                        <Label className="text-lg font-semibold">
                          Idea Tagline
                        </Label>
                        <h2 className="text-xl font-bold mt-1">
                          {idea.ideaTag}
                        </h2>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-lg font-semibold">
                        Developer Name
                      </Label>
                      <p className="text-md mt-1">By {idea.devName}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">
                        Description
                      </Label>
                      <p className="text-md mt-1">{idea.ideaDescription}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">
                        Competitors
                      </Label>
                      <p className="text-md mt-1">{idea.ideaComp}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">
                        Source Type
                      </Label>
                      <p className="text-md mt-1">
                        {idea.isOpenSource ? "Open Source" : "Closed Source"}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Label
                        htmlFor="comment"
                        className="text-lg font-semibold"
                      >
                        Add a Feedback
                      </Label>
                      <input
                        type="text"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Upvote or Downvote after feedback"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mt-6 flex space-x-4">
                      <Button
                        onClick={() => handleVote("upvote")}
                        variant="outline"
                      >
                        Upvote
                      </Button>
                      <Button
                        onClick={() => handleVote("downvote")}
                        variant="destructive"
                      >
                        Downvote
                      </Button>
                      {isModalOpen && <IdeaValidationDialog />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No ideas found for validation.
          </p>
        )}
      </div>
    </div>
  );
};

const IdeaValidationDialog = () => {
  const { toast } = useToast();
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast({
        title: "Copied!",
        description: "The link has been copied to your clipboard.",
      });
    }).catch((error) => {
      console.error("Failed to copy URL:", error);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the link. Please try again.",
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Share the address to Validate idea</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Idea Validation Link</DialogTitle>
          <DialogDescription>
            Copy the link below and share it with others to gather feedback.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="p-4 space-y-4">
          <input
            type="text"
            value={pageUrl}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <Button onClick={handleCopy}>Copy Link</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { IdeaValidationDialog };

export default Page;
