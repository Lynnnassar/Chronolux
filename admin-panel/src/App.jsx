import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import BrandList from "./pages/BrandList";
import BrandForm from "./pages/BrandForm";
import CategoryList from "./pages/CategoryList";
import CategoryForm from "./pages/CategoryForm";
import OrderList from "./pages/OrderList";
import CustomerList from "./pages/CustomerList";
import MediaLibrary from "./pages/MediaLibrary";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Collections from "./pages/Collections";
import CollectionForm from "./pages/CollectionForm";
import CategoryWatches from "./pages/CategoryWatches";
import CollectionWatches from "./pages/CollectionWatches";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/new" element={<ProductForm />} />
                    <Route
                      path="/products/:id/edit"
                      element={<ProductForm />}
                    />
                    <Route path="/brands" element={<BrandList />} />
                    <Route path="/brands/new" element={<BrandForm />} />
                    <Route path="/brands/:id/edit" element={<BrandForm />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/new" element={<CategoryForm />} />
                    <Route
                      path="/categories/:id/edit"
                      element={<CategoryForm />}
                    />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/media" element={<MediaLibrary />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/inventory" element={<ProductList />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route
                      path="/collections/new"
                      element={<CollectionForm />}
                    />
                    <Route
                      path="/collections/:id/edit"
                      element={<CollectionForm />}
                    />
                    <Route path="/collections/:id/watches" element={<CollectionWatches />} />

                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/new" element={<CategoryForm />} />
                    <Route
                      path="/categories/:id/edit"
                      element={<CategoryForm />}
                    />
                    <Route path="/categories/:id/watches" element={<CategoryWatches />} />

                    {/* Catch all - redirect to dashboard */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
