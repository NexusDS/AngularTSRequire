using System.Collections.Generic;
using TsTest.Model.Units;

namespace TsTest.Model.Data
{
    public interface IDataManager
    {
        IEnumerable<Unit> GetAllUnits();

        IEnumerable<UnitSmall> GetUpdatedData();
    }
}
