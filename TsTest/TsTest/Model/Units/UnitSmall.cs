using System.Collections.Generic;

namespace TsTest.Model.Units
{
    public class UnitSmall
    {
        public UnitSmall()
        {
            AggregatedUnits = new List<UnitSmall>();
        }

        public int Id { get; set; }

        public int Value { get; set; }

        public IEnumerable<UnitSmall> AggregatedUnits { get; set; }
    }
}