"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";

interface Idea {
  title: string;
  response: string | { role: string; content: string; refusal?: string };
  createdAt: string;
}

const IdeasPage = () => {
  const [data, setData] = useState<Idea[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) return;
      try {
        const userId = user.id;
        const response = await fetch(`http://localhost:3200/response/api/ideas?userId=${userId}`);
        const result = await response.json();
        console.log(result.data);
        setData(result.data); // Use `result.data` to access the ideas
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="container h-screen py-[14vh]">
      <div>
        <h1 className="text-3xl font-bold">Ideas</h1>
        <p className="text-lg">Welcome to the ideas page</p>
        <div className="p-8">
          <Table>
            <TableCaption>A list of your project ideas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Idea Title</TableHead>
                <TableHead>Response</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((idea, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {typeof idea.response === "string"
                      ? JSON.parse(idea.response).title
                      : idea.title}
                  </TableCell>
                  <TableCell>
                    {typeof idea.response === "string"
                      ? JSON.parse(idea.response).description
                      : idea.response.content}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
