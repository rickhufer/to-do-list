import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TiDelete } from "react-icons/ti";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const todoSchema = z.object({
  title: z.string().min(1, { message: "El título del ToDo es requerido" }),
});

export function TodoList() {
  const allTodos = trpc.getAllTodos.useQuery();

  const createTodo = trpc.createTodo.useMutation();
  const updateTodo = trpc.updateTodo.useMutation();

  const deleteTodo = trpc.deleteTodo.useMutation();

  const handleDelete = async (id: number) => {
    await deleteTodo.mutate(id, {
      onSuccess: () => allTodos.refetch(),
    });
  };

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleCreate = async (values: z.infer<typeof todoSchema>) => {
    await createTodo.mutate(values, {
      onSuccess: () => {
        allTodos.refetch();
        form.reset();
      },
    });
  };

  const toggleTodoStatus = async ({
    id,
    title,
    status,
  }: {
    id: number;
    title: string;
    status: string;
  }) => {
    const newStatus = status == "COMPLETED" ? "PENDING" : "COMPLETED";
    await updateTodo.mutate(
      { id, status: newStatus, title },
      {
        onSuccess: () => {
          allTodos.refetch();
        },
      }
    );
  };

  return (
    <div className='flex flex-col items-center'>
      <h1>To Do List</h1>
      <div className='mt-5 block w-full max-w-96 '>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
            className='mb-10 grid grid-cols-3 items-center gap-2'
          >
            <div className='col-span-2 w-full'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="P. ej.: 'Mi primer ToDo'"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' disabled={!isValid || isSubmitting}>
              Add
            </Button>
          </form>
        </Form>
        <Table className='bg-gray-100'>
          <TableBody>
            {allTodos.data?.length ? (
              allTodos.data?.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>
                    <Input
                      type='checkbox'
                      checked={todo.status == "COMPLETED"}
                      onChange={() =>
                        toggleTodoStatus({
                          id: todo.id,
                          status: todo.status,
                          title: todo.title,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "w-full",
                      todo.status === "COMPLETED" ? "line-through" : ""
                    )}
                  >
                    {todo.title}
                  </TableCell>
                  <TableCell className='p-0'>
                    <span
                      className={cn(
                        "block w-20 rounded-full px-2 py-1 text-center text-[0.6rem]",
                        todo.status === "COMPLETED"
                          ? "bg-green-500"
                          : "bg-red-500"
                      )}
                    >
                      {todo.status}
                    </span>
                  </TableCell>
                  <TableCell className='w-6'>
                    <Button
                      type='button'
                      variant={"link"}
                      className='m-0 p-0'
                      onClick={() => handleDelete(todo.id)}
                    >
                      <TiDelete size={25} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No existen ToDos</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
