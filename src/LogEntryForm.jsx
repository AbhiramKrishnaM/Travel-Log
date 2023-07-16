import { useForm } from "react-hook-form";
import { useState } from "react";
import { createLogEntry } from "./Api";

function LogEntryForm({ location, onClose }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(data) {
    setLoading(true);
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.messsage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3>{error}</h3> : null}
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
      <button disabled={loading}>
        {loading ? "Loading..." : "Create Entry"}
      </button>
    </form>
  );
}

export default LogEntryForm;
