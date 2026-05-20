import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getMyOrders } from "@/services/api/orders";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Account
          </p>
          <h1 className="text-4xl font-serif">{user?.fullName}</h1>
          <p className="text-sm text-red/60 mt-2">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="text-xs uppercase tracking-[0.3em] text-black/60 hover:text-black"
        >
          Sign out
        </button>
      </div>

      <div className="mt-12 bg-white border border-black/5 rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-black/40">
          Order history
        </p>
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <p className="text-sm text-black/60">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-black/60">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="border-b border-black/5 pb-4">
                <div className="flex justify-between text-sm">
                  <span>Order #{order._id.slice(-6).toUpperCase()}</span>
                  <span className="text-black/50">{order.status}</span>
                </div>
                <p className="text-xs text-black/50 mt-1">
                  Total: ${order.totalPrice.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
