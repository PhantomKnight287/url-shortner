import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Table,
} from "@mantine/core";
import Head from "next/head";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export default function HomePage() {
  const form = useForm({
    initialValues: {
      url: "",
      slug: "",
    },
  });
  const [urls, setUrls] = useState<
    {
      url: string;
      views: string;
      slug: string;
      createdAt: string;
      id: string;
    }[]
  >([]);
  const [error, setError] = useState("");
  async function fetchURLs() {
    fetch("/api/all")
      .then((res) => res.json())
      .then(setUrls)
      .catch(() => {});
  }

  useEffect(() => {
    fetchURLs();
  }, []);

  return (
    <Container size={420} my={40}>
      <Head>
        <title>URL Shortner</title>
      </Head>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        URL Shortner
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Shorten A URL
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((e) => {
            setError("");
            fetch(`${window.location.origin}/api/shorten`, {
              method: "POST",
              body: JSON.stringify(e),
            })
              .then((res) => res.json())
              .then((data) => {
                if (!data.message)
                  return navigator.clipboard
                    .writeText(data.url)
                    .then(() => {
                      alert("URL Copied To Clipboard");
                    })
                    .catch((err) => {
                      setError(
                        err.response?.data?.message || "An Error Occured"
                      );
                    });
                if (data.message) {
                  return setError(data.message || "An Error Occured");
                }
                setError("An Error Occured");
              });
          })}
        >
          <TextInput
            label="Slug"
            placeholder="my-slug"
            required
            {...form.getInputProps("slug")}
          />
          <TextInput
            label="URl"
            placeholder="https://example.com"
            {...form.getInputProps("url")}
            type="url"
            required
            mt="md"
          />
          {error ? (
            <Text color="red" mt="md" align="center">
              {error}
            </Text>
          ) : null}
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
      {urls ? (
        <Table mt="xl">
          <thead>
            <tr>
              <th>Slug</th>
              <th>URL</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id}>
                <td>{url.slug}</td>
                <td>
                  <a
                    href={url.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#1971c2" }}
                  >
                    {url.url}
                  </a>
                </td>
                <td>{url.views}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </Container>
  );
}
