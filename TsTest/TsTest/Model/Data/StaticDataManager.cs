using System;
using System.Collections.Generic;
using System.Linq;
using TsTest.Model.Units;

namespace TsTest.Model.Data
{
    public class StaticDataManager : IDataManager
    {
        private const int UNITS_COUNT = 20;
        private const int SUB_UNITS_COUNT = 10;

        private IEnumerable<Unit> _units;

        public StaticDataManager()
        {
            var random = new Random();
            var units = new List<Unit>();
            var currentId = 0;

            for (int i = 1; i <= UNITS_COUNT; i++)
            {
                var max = random.Next(100) + 50;

                var unit = new Unit
                {
                    Id = currentId++,
                    Max = max,
                    Min = 1,
                    Value = random.Next(max) + 1,
                    Name = string.Format("Unit{0}", i)
                };

                var subUnits = new List<Unit>();
                for (int j = 1; j < SUB_UNITS_COUNT; j++)
                {
                    max = random.Next(100) + 50;

                    var subUnit = new Unit
                    {
                        Id = currentId++,
                        Max = max,
                        Min = 1,
                        Value = random.Next(max) + 1,
                        Name = string.Format("Unit{0}.{1}", i, j)
                    };

                    subUnits.Add(subUnit);
                }

                unit.AggregatedUnits = subUnits;
                units.Add(unit);
            }

            _units = units;
        }

        public IEnumerable<Unit> GetAllUnits()
        {
            return _units;
        }

        public IEnumerable<UnitSmall> GetUpdatedData()
        {
            _units.ToList().ForEach(ModifyUnit);
            return _units.ToList().Select(ConvertUnit);
        }

        private void ModifyUnit(Unit unit)
        {
            var currentTime = DateTime.Now.Millisecond;
            var random = new Random(unit.Id + currentTime);
            unit.Value = unit.Min + random.Next(unit.Max - unit.Min);
            unit.AggregatedUnits.ToList().ForEach(ModifyUnit);
        }

        private UnitSmall ConvertUnit(Unit unit)
        {
            var small = new UnitSmall { Id = unit.Id, Value = unit.Value };
            small.AggregatedUnits = unit.AggregatedUnits.ToList().Select(ConvertUnit);
            return small;
        }
    }
}