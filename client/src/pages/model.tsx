import { useParams } from "wouter";
import Home from "./home";

export default function ModelPage() {
  const { model } = useParams<{ model: string }>();
  
  return <Home modelParam={model} />;
}