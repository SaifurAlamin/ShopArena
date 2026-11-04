import { ORDER_STATUS_COLORS } from "../../utils/constants";

export default function StatusBadge({ status = "Pending" }) {
  const color = ORDER_STATUS_COLORS[status] || "secondary";
  return <span className={`badge text-bg-${color}`}>{status}</span>;
}