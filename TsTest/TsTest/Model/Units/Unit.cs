using System.Collections.Generic;

namespace TsTest.Model.Units
{
    public class Unit
    {
        public Unit()
        {
            AggregatedUnits = new List<Unit>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Min { get; set; }

        public int Max { get; set; }

        public int Value { get; set; }

        public IEnumerable<Unit> AggregatedUnits { get; set; }
    }
}