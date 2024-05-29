import { Formik, FieldArray, Form } from "formik";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Text,
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import * as Yup from "yup";
import { StatusEnum } from "@/core/enums/custumerStatus.enum";
import { IndustryEnum } from "@/core/enums/industry.enum";
import { CustomerModel } from "@/core/models/customer.model";
import { randomId } from "@mantine/hooks";
import { useState } from "react";
import { ProjectModel } from "@/core/models/project.model";
import ProjectCard from "./project-card.component";
import { useModal } from "@/context/ModalContext";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  costumerStatus: Yup.string().required("Status is required"),
  industry: Yup.string().required("Industry is required"),
  about: Yup.string().required("About is required"),
});
interface CustomerFormProps {
  customer: CustomerModel;
  onSave: (customer: CustomerModel) => void;
}
const CustomerForm = ({ customer, onSave }: CustomerFormProps) => {
  const { closeModal } = useModal();
  const [projectFields, setProjectFields] = useState<ProjectModel>(
    {} as ProjectModel
  );
  const initialValues = !!customer.costumerId
    ? {
        ...customer,
      }
    : {
        costumerId: "",
        costumerStatus: "",
        companyName: "",
        industry: "",
        projects: [],
        about: "",
      };

  const handleSubmit = (values: any, helper: any) => {
    onSave({ ...values, costumerId: values.costumerId || randomId() });
    closeModal();
    helper.resetForm();
    setProjectFields({} as ProjectModel);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form className="flex flex-col items-center gap-4">
          <FieldArray name="projects">
            {({ push, remove }) => (
              <>
                <div className="flex items-start gap-8 w-full">
                  <div className="flex-1 flex flex-col gap-3">
                    <Text fz="lg" fw={600}>
                      {" "}
                      Company Fields
                    </Text>
                    <TextInput
                      label="Company Name"
                      placeholder="Company Name"
                      name="companyName"
                      value={values.companyName}
                      onChange={(value) =>
                        setFieldValue("companyName", value.target.value)
                      }
                      error={touched.companyName && errors.companyName}
                      required
                    />
                    <Select
                      label="Customer Status"
                      placeholder="Select status"
                      name="costumerStatus"
                      data={StatusEnum.items}
                      value={values.costumerStatus}
                      onChange={(value) =>
                        setFieldValue("costumerStatus", value)
                      }
                      error={touched.costumerStatus && errors.costumerStatus}
                      required
                    />

                    <Select
                      label="Industry"
                      placeholder="Select industry"
                      name="industry"
                      value={values.industry}
                      data={IndustryEnum.items}
                      onChange={(value) => setFieldValue("industry", value)}
                      error={touched.industry && errors.industry}
                      required
                    />
                    <Textarea
                      label="About Company"
                      value={values.about}
                      placeholder="About Company"
                      name="about"
                      onChange={(value) =>
                        setFieldValue("about", value.target.value)
                      }
                      error={touched.about && errors.about}
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <Text fz="lg" fw={600}>
              
                      Project Fields
                    </Text>
                    <TextInput
                      label={`Project  Name`}
                      placeholder="Project Name"
                      value={projectFields.projectName || ""}
                      onChange={(value) => {
                        setProjectFields({
                          ...projectFields,
                          projectName: value.target.value as any,
                        });
                      }}
                    />
                    <TextInput
                      label={`Project Contact`}
                      placeholder="Project Contact"
                      value={projectFields.contact || ""}
                      onChange={(value) => {
                        setProjectFields({
                          ...projectFields,
                          contact: value.target.value as any,
                        });
                      }}
                    />

                    <DateInput
                      label="Start project"
                      placeholder="Choose Date"
                      value={
                        !!projectFields.startDate
                          ? dayjs(
                              projectFields.startDate,
                              "YYYY MMM DD"
                            ).toDate()
                          : undefined
                      }
                      onChange={(value) => {
                        setProjectFields({
                          ...projectFields,
                          startDate: dayjs(value).format("YYYY MMM DD"),
                        });
                      }}
                      valueFormat="YYYY MMM DD"
                    />

                    <DateInput
                      label="End project"
                      placeholder="Choose Date"
                      value={
                        !!projectFields?.endDate
                          ? dayjs(
                              projectFields?.endDate,
                              "YYYY MMM DD"
                            ).toDate()
                          : undefined
                      }
                      onChange={(value) => {
                        setProjectFields({
                          ...projectFields,
                          endDate: dayjs(value).format("YYYY MMM DD"),
                        });
                      }}
                      valueFormat="YYYY MMM DD"
                    />

                    <Button
                      onClick={() => {
                        push({
                          projectId: randomId(),
                          projectName: projectFields.projectName,
                          contact: projectFields.contact,
                          startDate: projectFields.startDate,
                          endDate: projectFields.endDate,
                        });
                        setProjectFields({} as ProjectModel);
                      }}
                    >
                      + Add Project
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col overflow-x-hidden items-start gap-3 w-full">
                {!!values.projects.length && <Text fz="lg" fw={600}>Projects</Text>}
                <Grid overflow={"auto"} className=" max-h-64  w-full">
              
                  {values.projects.map((project, index) => (
                    <Grid.Col key={index} span={{ base: 12, xs: 4 }}>
                      <ProjectCard
                        setProjectFields={setProjectFields}
                        remove={remove}
                        index={index}
                        project={project}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
                </div>
              </>
            )}
          </FieldArray>
          <Group mt="lg">
            <Button type="submit">Submit</Button>
          </Group>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerForm;
