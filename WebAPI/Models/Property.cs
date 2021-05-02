using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Property : BaseEntity
    {
        public int SellRent { get; set; }
        public string Address { get; set; }
        public int PropertyTypeId { get; set; }
        public PropertyType PropertyType { get; set; }
        public int NumberOfRooms { get; set; }
        public int FurnishingTypeId { get; set; }
        public FurnishingType FurnishingType { get; set; }
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public int FloorLevel { get; set; }
        public int PostalCode { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
        public int Aconto { get; set; }
        public bool ReadyToMove { get; set; }
        public int SecurityDeposit { get; set; }
        public DateTime EstPossessionOn { get; set; }
        public int AgeOfProperty { get; set; }
        public string Description { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public DateTime PostedOn { get; set; } = DateTime.Now;
        
        [ForeignKey("User")]
        public int PostedBy { get; set; } 
        public User User { get; set; }       
    }
}