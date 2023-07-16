import { useForm } from "react-hook-form";

function LogEntryForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <input name="title" required {...register("title")} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" {...register("comments")} row={3}></textarea>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        {...register("description")}
        row={3}
      ></textarea>
      <label htmlFor="image">Image </label>
      <input name="image" {...register("image")} />
      <label htmlFor="visitdate">Visit Date</label>
      <input name="visitdate" type="date" {...register("visitDate")} required />
      <button>Create Entry</button>
    </form>
  );
}

export default LogEntryForm;
