namespace MyBackend.DTO.Results.Base
{
    public class Result<T> : IResult<T>
    {
        public bool Success { get; protected set; }
        public IEnumerable<T> DataList { get; protected set; } = new List<T>();
        public string Error { get; protected set; }

        // Constructor
        public Result()
        {
            Success = false;
            Error = string.Empty;
        }
        
        // Método para modificar Success
        public void SetSuccess(bool success)
        {
            Success = success;
        }

        public void SetError(string error)
        {
            Error = error;
        }
        
        public void SetDataList(List<T> dataList)
        {
            DataList = dataList;
        }
    }
}