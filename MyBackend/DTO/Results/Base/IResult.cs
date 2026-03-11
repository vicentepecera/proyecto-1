namespace MyBackend.DTO.Results.Base
{

    public interface IResult<T>
    {
        bool Success { get; }
        IEnumerable<T> DataList { get; }
        string Error { get; }
    }
}