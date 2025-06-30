"use client"

import { NewButton } from "@/components/ui/new-button";
import { DeleteModal } from "@/components/delete-modal"
import React from "react";




export default function Home() {
  return (
    <div className="flex h-screen mt-20">
       <DeleteModal onConfirm={() => console.log("Exclusão confirmada")}>
      <button className="">🗑️ Excluir</button>
      </DeleteModal>
    </div>
  );
}