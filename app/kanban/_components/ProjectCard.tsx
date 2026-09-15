import Link from "next/link";

const ProjectCard = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-between border border-gray-200 px-4 py-2 rounded-full"

    >
      <div className="font-medium">Twitter Clone</div>
      <div className="text-muted-foreground text-xs">12 Sept</div>
    </Link>
  );
};

export default ProjectCard;
