import { FiInbox } from "react-icons/fi";

export default function EmptyState({ title = "No data found", description = "There is nothing to display right now." }) {
  return (
    <div className="text-center py-5">
      <FiInbox size={42} className="text-secondary mb-3" />
      <h5>{title}</h5>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
}