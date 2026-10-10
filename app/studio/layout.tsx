import { notFound } from "next/navigation";

/** Routes stay in the tree. Nothing under /studio is served. */
export default function StudioLayout() {
  notFound();
}
