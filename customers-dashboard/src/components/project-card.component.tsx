import { ProjectModel } from "@/core/models/project.model";
import { Group, Text, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React, { Dispatch, SetStateAction } from "react";

interface ProjectCardProps {
  index: number;
  project: ProjectModel;
  remove: (x: number) => void;
  setProjectFields: Dispatch<SetStateAction<ProjectModel>>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  setProjectFields,
  index,
  project,
  remove,
}: ProjectCardProps) => {
  return (
    <div className="p-2 rounded border-2 border-gray-300">
      <Group wrap="nowrap">
        <div className="w-full">
          <div className="flex  items-center justify-between">
            <Text truncate="end" fz="md" fw={500} w={200}>
              {project.projectName}
            </Text>
            <div className="flex items-center gap-1">
              <IconPencil
                className="cursor-pointer"
                onClick={() => {
                  remove(index);
                  setProjectFields(project);
                }}
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
              <IconTrash
                onClick={() => {
                  remove(index);
                }}
                className="cursor-pointer"
                style={{ color: "red", width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </div>
          </div>
          <Text fz="xs" tt="uppercase" fw={400} c="dimmed">
            {project.contact || "--"}
          </Text>
          <div className="flex justify-between items-center">
            <Text fz="xs" tt="uppercase" fw={500} c="dimmed">
              {project.startDate || "--"}
            </Text>
            <Text fz="xs" tt="uppercase" fw={500} c="dimmed">
              {project.endDate || "--"}
            </Text>
          </div>
        </div>
      </Group>
    </div>
  );
};
export default ProjectCard;
