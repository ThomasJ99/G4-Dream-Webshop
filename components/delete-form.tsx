import Form from "next/form";
import {
  deleteProduct,
  deleteProductBind,
} from "@/app/products/create/actions";

// Here we pass the formData along and get the id from that in the action
export function DeleteForm({ id }: { id: string }) {
  return (
    <Form action={deleteProduct}>
      <input hidden readOnly name="id" value={id} />
      <button className="hover:cursor-pointer" type="submit">
        Delete
      </button>
    </Form>
  );
}

// With bind we instead pass on/bind our id to the form and pass it along this way
// doing this we can skip the hidden input
// https://nextjs.org/docs/app/guides/forms#passing-additional-arguments
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

export function DeleteFormBind({ id }: { id: string }) {
  const deleteWithBind = deleteProductBind.bind(null, id);
  return (
    <Form action={deleteWithBind}>
      <button className="hover:cursor-pointer" type="submit">
        Delete
      </button>
    </Form>
  );
}