"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

import { useEffect, useState } from "react";

interface Idea {
  projectID: string;
  ideaTitle: string;
  devName: string;
  ideaDescription: string;
  isOpenSource: boolean;
  upvotes: number;
  downvotes: number;
}

const staticIdeas = [
  {
    ideaName: "AI Chatbot",
    devName: "Alice",
    ideaDesc: "A chatbot that uses AI to answer customer queries.",
    upvotes: 120,
    isOpenSource: true,
    downvotes: 10,
  }
];

export function TableDemo() {
  const [fetchedIdeas, setFetchedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [hrefTo, sethrefTo] = useState(false);
  
  console.log("fetchedIdeas", fetchedIdeas);
  console.log("fetchedIdeas", typeof fetchedIdeas);
  

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const response = await fetch(
          "http://localhost:3200/response/api/getValidationIdeas"
        ).then((res) => res.json());
        console.log("response", response.data.map((idea: Idea) => idea.ideaTitle));
        setFetchedIdeas(response.data);
        setLoading(false);
        sethrefTo(true);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    }
    fetchIdeas();
  }, []);

  return (
    <Table>
      <TableCaption>A list of recent ideas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Idea Name</TableHead>
          <TableHead>Dev Name</TableHead>
          <TableHead>Idea Description</TableHead>
          <TableHead className="text-right">UpVotes</TableHead>
          <TableHead className="text-right">DownVotes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : fetchedIdeas.length > 0 ? (
          fetchedIdeas.map((IdeaData) => (
            <TableRow key={IdeaData.projectID} className="h-[80px]">
              <TableCell className="font-medium">
              <Link href={`/ideaHunt/${IdeaData.projectID}`} className="text-blue-500 hover:underline">
                {IdeaData.ideaTitle}
              </Link>
              </TableCell>
              <TableCell>
              <Link href={`/ideaHunt/${IdeaData.projectID}`} className="text-blue-500 hover:underline">
                {IdeaData.devName}
              </Link>
              </TableCell>
              <TableCell>
              <Link href={`/ideaHunt/${IdeaData.projectID}`} className="text-blue-500 hover:underline">
                {IdeaData.ideaDescription}
              </Link>
              </TableCell>
              <TableCell className="text-right">{IdeaData.upvotes}</TableCell>
              <TableCell className="text-right">{IdeaData.downvotes}</TableCell>
            </TableRow>
          ))
        ) : (
          staticIdeas.map((IdeaData) => (
            <TableRow key={IdeaData.ideaName} className="h-[80px]">
              <TableCell className="font-medium">{IdeaData.ideaName}</TableCell>
              <TableCell>{IdeaData.devName}</TableCell>
              <TableCell>{IdeaData.ideaDesc}</TableCell>
              <TableCell className="text-right">{IdeaData.isOpenSource}</TableCell>
              <TableCell className="text-right">{IdeaData.downvotes}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
