<script lang="ts">
  import { useConvexClient, useQuery } from 'convex-svelte';
  import { api, type Id } from '$lib/convex';

  type Comment = {
    _id: Id<'comments'>;
    name: string;
    content: string;
    parentId?: Id<'comments'>;
    createdAt: number;
  };

  type CommentWithReplies = Comment & { replies: CommentWithReplies[] };

  let { postSlug }: { postSlug: string } = $props();

  const commentsQuery = useQuery(api.comments.getCommentsByPost, () => ({ postSlug }));
  const client = useConvexClient();

  let name = $state('');
  let content = $state('');
  let replyTo = $state<Id<'comments'> | null>(null);

  const buildCommentTree = (comments: Comment[]): CommentWithReplies[] => {
    const map = new Map<string, CommentWithReplies>();
    const roots: CommentWithReplies[] = [];

    comments.forEach((comment) => map.set(comment._id as string, { ...comment, replies: [] }));
    comments.forEach((comment) => {
      const node = map.get(comment._id as string);
      if (!node) return;
      if (comment.parentId) {
        const parent = map.get(comment.parentId as string);
        if (parent) parent.replies.push(node);
        else roots.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots.sort((a, b) => b.createdAt - a.createdAt);
  };

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!name.trim() || !content.trim()) return;

    await client.mutation(api.comments.addComment, {
      postSlug,
      name,
      content,
      parentId: replyTo ?? undefined,
    });

    name = '';
    content = '';
    replyTo = null;
  };

  const handleReply = (id: Id<'comments'>) => {
    replyTo = id;
    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const commentTree = $derived(
    commentsQuery.data ? buildCommentTree(commentsQuery.data as Comment[]) : []
  );
</script>

{#snippet item(comment: CommentWithReplies)}
  <div class="comment">
    <div class="comment-header">
      <span class="comment-author">{comment.name}</span>
      <span class="comment-date">{formatDate(comment.createdAt)}</span>
    </div>
    <div class="comment-content">{comment.content}</div>
    <div class="comment-actions">
      <button class="comment-reply-button" onclick={() => handleReply(comment._id)}>Reply</button>
    </div>

    {#if comment.replies.length > 0}
      <div class="comment-children">
        {#each comment.replies as child (child._id)}
          {@render item(child)}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}

<div class="comments-section">
  <h2 class="comments-title">Comments</h2>

  <form class="comment-form" id="comment-form" onsubmit={handleSubmit}>
    <input type="text" class="comment-name-input" placeholder="Your name" bind:value={name} maxlength="50" required />
    <textarea
      class="comment-input"
      placeholder={replyTo ? 'Write a reply...' : 'Write a comment...'}
      bind:value={content}
      maxlength="1000"
      required
    ></textarea>
    <div class="comment-form-footer">
      <span class="character-count">{content.length}/1000</span>
      <div>
        {#if replyTo}
          <button
            type="button"
            class="secondary-button"
            onclick={() => (replyTo = null)}
            style="margin-right: 12px"
          >
            Cancel reply
          </button>
        {/if}
        <button type="submit" class="comment-submit" disabled={!name.trim() || !content.trim()}>
          Submit
        </button>
      </div>
    </div>
  </form>

  {#if commentsQuery.isLoading}
    <div class="comments-loading">Loading comments...</div>
  {:else if commentTree.length === 0}
    <div class="comments-empty">No comments yet. Be the first to comment!</div>
  {:else}
    <div class="comments-list">
      {#each commentTree as comment (comment._id)}
        {@render item(comment)}
      {/each}
    </div>
  {/if}
</div>
