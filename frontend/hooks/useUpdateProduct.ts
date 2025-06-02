// Cập nhật thông tin một sản phẩm theo productId
// export const useUpdateProduct = () => {
//   return useMutation({
//     mutationFn: ({ id, data }) => updateProduct(id, data),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries(["product", variables.id]);
//       queryClient.invalidateQueries(["products"]);
//     },
//   });
// };
