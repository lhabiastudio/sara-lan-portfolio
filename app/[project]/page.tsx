import { projects, getProject } from "@/lib/projects";
import { redirect } from "next/navigation";
import ProjectClientPage from "@/components/ProjectClientPage";

export function generateStaticParams() {
  return projects
    .filter((p) => p.status === "published")
    .map((p) => ({ project: p.slug }));
}

export default function ProjectPage({ params }: { params: { project: string } }) {
  const project = getProject(params.project);

  if (!project) {
    redirect("/");
  }

  return <ProjectClientPage project={project} />;
}
