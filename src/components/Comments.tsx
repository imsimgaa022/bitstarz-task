"use client";

import { loadComments } from "@/actions/comments/load";
import { useQuery } from "@tanstack/react-query";

interface CommentsProps {
  productId: string;
}

function CommentsList({ productId }: CommentsProps) {
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => loadComments(productId),
  });

  if (isLoading) {
    return <div className="text-gray-500">Loading comments...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 rounded-lg border border-red-200 p-4">
        Error loading comments. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment, ind) => (
        <div key={ind} className="rounded-lg border border-gray-200 p-4">
          <p className="text-gray-700">{comment}</p>
        </div>
      ))}
      {comments.length === 0 && (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}

export function Comments({ productId }: CommentsProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold text-gray-900">Comments</h2>
      <CommentsList productId={productId} />
    </section>
  );
}
